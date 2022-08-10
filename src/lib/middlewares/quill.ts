import Quill from "quill";

const quillmiddleware = (node: Element, options: object) => {
  const quillInstance = new Quill(node, options);

  quillInstance.on("text-change", (delta, oldDelta, source) => {
    node.dispatchEvent(
      new CustomEvent("text-change", {
        detail: {
          html: quillInstance.root.innerHTML,
          delta: quillInstance.getContents(),
          text: quillInstance.getText(),
        },
      })
    );
  });

  return quillInstance;
};

export { quillmiddleware };
