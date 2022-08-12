export interface QlDelta {
  ops: Array<QlDeltaOp>;
}

declare let hljs: any;

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
  script?: string;
  align?: string;
}

class QlRenderer {
  // private currentNode: Node;
  private parent: Node;
  private currentLine: Array<Node> = new Array<Node>();
  private currentCodeBlock?: HTMLElement = undefined;

  createCodeBlock() {
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.classList.add("code-block-container");
    pre.appendChild(code);
    this.parent.appendChild(pre);
    this.currentCodeBlock = code;
  }

  checkCodeBlock(op: QlDeltaOp): boolean {
    if (op.attributes) {
      if (op.attributes["code-block"]) {
        if (this.currentCodeBlock == undefined) {
          // create new code block
          this.createCodeBlock();
        }
        // is a code block
        return true;
      }
    }
    this.resetCodeBlock();
    return false;
  }

  resetCodeBlock() {
    this.currentCodeBlock = undefined;
  }

  nestDown(x: Node, tag: string): HTMLElement {
    let t = document.createElement(tag);
    t.appendChild(x);
    return t;
  }

  handleLine(op: QlDeltaOp, line: string): Node {
    let x: Node;
    let text = document.createTextNode(line);
    x = text;
    if (op.attributes) {
      if (op.attributes.script) {
        if (op.attributes.script == "sub") {
          x = this.nestDown(x, "sub");
        } else if (op.attributes.script == "super") {
          x = this.nestDown(x, "sup");
        }
      }
      if (op.attributes.bold) {
        x = this.nestDown(x, "strong");
      }
      if (op.attributes.italic) {
        x = this.nestDown(x, "em");
      }
      if (op.attributes.strike) {
        x = this.nestDown(x, "s");
      }
      if (op.attributes.underline) {
        x = this.nestDown(x, "u");
      }
      if (op.attributes.link) {
        let a = this.nestDown(x, "a");
        // try to validate url?
        a.setAttribute("href", op.attributes.link);
        a.className =
          "underline text-blue-600 hover:text-blue-800 visited:text-purple-600";
        x = a;
      }
    }

    return x;
  }

  addToLine(op: QlDeltaOp, str: string) {
    this.currentLine.push(this.handleLine(op, str));
  }

  endCodeBlockLine() {
    let p = this.currentCodeBlock;
    p.append(...this.currentLine);
    p.textContent += "\n";
    this.currentLine = [];
  }

  endLine(op: QlDeltaOp) {
    if (this.checkCodeBlock(op)) {
      this.endCodeBlockLine();
      return;
    }

    let tag: string = "p";

    let p = document.createElement(tag);
    if (op.attributes) {
      // check for line formats if not code
      if (op.attributes.header) {
        if (typeof op.attributes.header == "number") {
          p.classList.add(`text-${4 - op.attributes.header + 1}xl`);
        }
      }
      if (op.attributes.align) {
        if (op.attributes.align == "justify") {
          p.classList.add("text-justify");
        }
        if (op.attributes.align == "right") {
          p.classList.add("text-right");
        }
        if (op.attributes.align == "center") {
          p.classList.add("text-center");
        }
      }
    }

    if (this.currentLine.length == 0) {
      p.append(document.createElement("br"));
    }

    p.append(...this.currentLine);
    this.parent.appendChild(p);
    this.currentLine = [];
  }

  handleString(op: QlDeltaOp, insert: string) {
    // if there are multiple lines we need to split them into seperate <p> tags
    let lines: Array<string> = insert.split("\n");
    // add first line, normally, on any subsequent line, endline and then add new line
    let i = 0;
    if (lines[i].length > 0) {
      this.addToLine(op, lines[i]);
    }
    while (++i < lines.length) {
      // we are assuming beginning of code block won't contain \n
      this.endLine(op);
      // we can safely assume that there were no line formats associated with them
      // so we directly add them to the DOM
      if (lines[i].length > 0) {
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
  }

  constructor(parent: Element) {
    this.parent = parent;
  }
}

export const renderDelta = (root: HTMLElement, qlDeltaContent: QlDelta) => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  try {
    let renderer = new QlRenderer(root);
    renderer.render(qlDeltaContent);
    if (hljs) {
      hljs.highlightAll();
    }
  } catch (e: any) {
    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.appendChild(code);
    code.textContent = e.message;
    root.appendChild(pre);
  }
};
