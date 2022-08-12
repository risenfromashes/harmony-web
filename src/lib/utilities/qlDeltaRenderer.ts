export interface QlDelta {
  ops: Array<QlDeltaOp>;
}

interface QlImage {
  link: string;
}

interface QlDeltaOp {
  insert: string | QlImage;
  attributes?: QlAttribute;
}

interface QlAttribute {
  header?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  "code-block"?: string;
  math?: string;
  link?: string;
}

class QlRenderer {
  // private currentNode: Node;
  private parent: Node;
  private currentLine: Array<Node> = new Array<Node>();
  private currentCodeBlock?: HTMLElement = undefined;

  checkCodeBlock(op: QlDeltaOp) {
    if (op.attributes) {
      if (op.attributes["code-block"]) {
        if (!this.hasCodeBlock()) {
          console.log("entering code block");
          // create new code block
          let c = document.createElement("code");
          let pre = document.createElement("pre");
          this.parent.appendChild(pre);
          pre.appendChild(c);
          this.currentCodeBlock = c;
        }
      } else if (this.hasCodeBlock()) {
        // there are attributes but not code-block
        this.resetCodeBlock();
      }
    }
  }

  createTextNode(str: string) {
    return document.createTextNode(str);
  }

  hasCodeBlock(): boolean {
    return this.currentCodeBlock != undefined;
  }

  resetCodeBlock() {
    console.log("leaving code block");
    this.currentCodeBlock = undefined;
  }

  handleLine(op: QlDeltaOp, line: string): Node {
    let x: Node;
    if (line.trim().length == 0) {
      x = document.createElement("br");
    } else {
      let text = this.createTextNode(line);
      x = text;
      if (op.attributes) {
        if (op.attributes.bold) {
          let b = document.createElement("strong");
          b.appendChild(x);
          x = b;
        }
        if (op.attributes.italic) {
          let em = document.createElement("em");
          em.appendChild(x);
          x = em;
        }
        if (op.attributes.strike) {
          let s = document.createElement("s");
          s.appendChild(x);
          x = s;
        }
        if (op.attributes.underline) {
          let u = document.createElement("u");
          u.appendChild(x);
          x = u;
        }
        if (op.attributes.link) {
          let a = document.createElement("a");
          // try to validate url?
          a.setAttribute("href", op.attributes.link);
          a.appendChild(x);
          x = a;
        }
      }
    }

    return x;
  }

  isNewLines(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) != "\n") {
        return false;
      }
    }
    return true;
  }

  addToLine(op: QlDeltaOp, str: string) {
    this.currentLine.push(this.handleLine(op, str));
  }

  addCode(str: string) {
    this.currentLine.push(this.createTextNode(str));
  }

  endCodeLine(str: string) {
    let p = this.currentCodeBlock;
    if (p) {
      let t = this.createTextNode(str);
      p.append(...this.currentLine, t);
      this.currentLine = [];
    }
  }

  endLine(tag: string = "p") {
    let p = document.createElement(tag);
    if (this.currentLine.length == 0) {
      p.append(document.createElement("br"));
    }
    p.append(...this.currentLine);
    this.currentLine = [];
    this.parent.appendChild(p);
  }

  handleNewLines(op: QlDeltaOp, insert: string) {
    // empty newline indicates format for current line [affecting previous elements]
    // fallback to p
    let tag: string = "p";
    if (op.attributes) {
      // attributes may dictate the type of tag
      if (op.attributes.header) {
        tag = "h1";
      }
      if (op.attributes["code-block"]) {
        return this.endCodeLine(insert);
      }
    }

    this.endLine(tag);

    // handle the rest of the new lines
    for (let i = 1; i < insert.length; i++) {
      this.endLine();
    }
  }

  handleString(op: QlDeltaOp, insert: string) {
    console.log("string: " + insert);
    this.checkCodeBlock(op);

    if (this.hasCodeBlock()) {
      // if we are sure that it is still a code block, then just append to it
      this.endCodeLine(insert);
    } else if (this.isNewLines(insert)) {
      // there are two reasons why newlines should be handled seperately
      // 1. they describe line formatting
      // 2. inside a code block, a \n is just a \n,
      //    whereas normally it would converted to <p> <br><p>
      this.handleNewLines(op, insert);
    } else {
      // if there are multiple lines we need to split them into seperate <p> tags
      let lines: Array<string> = insert.split("\n");
      if (lines[lines.length - 1].length == 0) {
        lines.pop();
      }
      // add first line, normally, on any subsequent line, endline and then add new line
      let i = 0;
      this.addToLine(op, lines[i]);
      while (++i < lines.length) {
        // we are assuming beginning of code block won't contain \n
        this.endLine();
        // we can safely assume that there were no line formats associated with them
        // so we directly add them to the DOM
        this.addToLine(op, lines[i]);
      }
    }
  }

  handleOp(op: QlDeltaOp) {
    if (typeof op.insert == "string") {
      this.handleString(op, op.insert);
    }
    // TODO: handle images
  }

  render(delta: QlDelta) {
    for (let op of delta.ops) {
      this.handleOp(op);
    }
    if (this.currentLine.length > 0) {
      this.endLine();
    }
    if (this.hasCodeBlock()) {
      this.resetCodeBlock();
    }
  }

  constructor(parent: Element) {
    this.parent = parent;
  }
}

export const renderDelta = (root: HTMLElement, qlDeltaContent: QlDelta) => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  console.log({ qlDeltaContent });
  try {
    let renderer = new QlRenderer(root);
    renderer.render(qlDeltaContent);
  } catch (e: any) {
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.appendChild(code);
    code.textContent = e.message;
    root.appendChild(pre);
  }
};
