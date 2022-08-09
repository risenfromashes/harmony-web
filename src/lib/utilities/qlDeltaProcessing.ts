export interface QlDelta {
  ops: Array<QlDeltaOps>;
}

export interface QlDeltaOps {
  insert: string;
  delete?: string;
  attributes?: QlDeltaOpsAttributes;
}

export interface QlDeltaOpsAttributes {
  header?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  "code-block"?: string;
}

export const qlDeltaToHtml = (qlDeltaContent: QlDelta): string => {
  if (Object.keys(qlDeltaContent).length === 0) {
    return "";
  }

  let html = `<p>`;
  let tagsToClose = [];

  // qlDeltaContent.ops.forEach((op, i) => {
  //   if (op.attributes && i < qlDeltaContent.ops.length - 1) {
  //     if (
  //       qlDeltaContent.ops[i + 1].attributes &&
  //       qlDeltaContent.ops[i + 1].attributes.header
  //     ) {
  //       html += `<h${qlDeltaContent.ops[i + 1].attributes.header}>`;
  //       tagsToClose.push(`h${qlDeltaContent.ops[i + 1].attributes.header}`);
  //     }
  //   }

  //   if (op.attributes) {
  //     if (op.attributes.bold) {
  //       html += `<strong>`;
  //       tagsToClose.push("strong");
  //     }

  //     if (op.attributes.italic) {
  //       html += `<em>`;
  //       tagsToClose.push("em");
  //     }

  //     if (op.attributes.underline) {
  //       html += `<u>`;
  //       tagsToClose.push("u");
  //     }

  //     if (op.attributes.strike) {
  //       html += `<s>`;
  //       tagsToClose.push("s");
  //     }

  //     // if (op.attributes["code-block"]) {
  //     //   html += `<code>`;
  //     //   tagsToClose.push("code");
  //     // }
  //   }

  //   html += op.insert;

  //   if (tagsToClose.length > 0) {
  //     tagsToClose.reverse().forEach((tag) => {
  //       html += `</${tag}>`;
  //     });
  //   }
  // });

  html += `</p>`;

  return html;
};
