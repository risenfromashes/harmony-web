import Quill from "quill";
import type { QlDelta } from "../utilities/qlDeltaRenderer";

interface Detail {
  delta: QlDelta;
  text: string;
}

export interface QuillTextChangeEvent {
  detail: Detail;
}

const quillmiddleware = (node: Element, options: object) => {
  const quillInstance = new Quill(node, options);

  quillInstance.on("text-change", (delta, oldDelta, source) => {
    node.dispatchEvent(
      new CustomEvent("text-change", {
        detail: {
          delta: quillInstance.getContents(),
          text: quillInstance.getText(),
        },
      })
    );
  });

  return quillInstance;
};

export { quillmiddleware };
