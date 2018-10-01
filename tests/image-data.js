import structuredClone from "../index.js";

const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("image data", function() {
  if (typeof document === "undefined") {
    return;
  }

  it("can clone", function() {
    const canvas = document.createElement("canvas").getContext("2d");
    const imgData = canvas.createImageData(1, 1);
    const clonedImgData = structuredClone(imgData);

    expect(clonedImgData).to.be.deep.equal(imgData);
    expect(clonedImgData).to.be.instanceof(ImageData);
  });
});
