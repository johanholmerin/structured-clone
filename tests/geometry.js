import structuredClone from "../index.js";

const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("geometry", function() {
  if (typeof DOMMatrix === "undefined") {
    return;
  }

  it("can clone a DOMMatrix", function() {
    const matrix = new DOMMatrix([2, 0, 0, 2, 10, 10]);
    const matrixClone = structuredClone(matrix);

    expect(matrixClone).to.be.deep.equal(matrix);
    expect(matrixClone).to.be.instanceof(DOMMatrix);
  });

  it("can clone a DOMPoint", function() {
    const point = new DOMPoint(4, 5, 1, 3);
    const pointClone = structuredClone(point);

    expect(pointClone).to.be.deep.equal(point);
    expect(pointClone).to.be.instanceof(DOMPoint);
  });

  it("can clone a DOMQuad", function() {
    const quad = new DOMQuad(
      new DOMPoint(4, 5, 1, 3),
      new DOMPoint(6, 6, 4, 7),
      new DOMPoint(9, 5, 2, 6),
      new DOMPoint(1, 5, 0, 4)
    );
    const quadClone = structuredClone(quad);

    expect(quadClone).to.be.deep.equal(quad);
    expect(quadClone).to.be.instanceof(DOMQuad);
  });

  it("can clone a DOMRect", function() {
    const rect = new DOMRect(0, 4, 10, 20);
    const rectClone = structuredClone(rect);

    expect(rectClone).to.be.deep.equal(rect);
    expect(rectClone).to.be.instanceof(DOMRect);
  });
});
