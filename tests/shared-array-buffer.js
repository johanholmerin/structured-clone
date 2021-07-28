import structuredClone from "../index.js";

const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("shared array buffer", function() {
  before(function(suite) {
    if (typeof SharedArrayBuffer === "undefined") {
      suite.skip();
    }
  });

  it("can clone a shared array buffer", function() {
    const buffer = new SharedArrayBuffer(4);
    const clonedBuffer = structuredClone(buffer);

    expect(clonedBuffer).to.not.equal(buffer);
    expect(clonedBuffer).to.be.deep.equal(buffer);
    expect(clonedBuffer).to.be.instanceof(SharedArrayBuffer);
  });

  it("has the same value", function() {
    const buffer = new SharedArrayBuffer(4);
    const arr = new Int32Array(buffer);
    arr[0] = 32;
    const clonedBuffer = structuredClone(buffer);
    const clonedArr = new Int32Array(clonedBuffer);

    expect(clonedArr).to.be.deep.equal(arr);
  });
});
