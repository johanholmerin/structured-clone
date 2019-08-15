import structuredClone from "../index.js";

const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("array", function() {
  it("copies non-index property", function() {
    const arr = [];
    arr.foo = "bar";
    const clonedArr = structuredClone(arr);

    expect(clonedArr).to.be.instanceof(Array);
    expect(clonedArr).not.to.be.equal(arr);
    expect(clonedArr.length).to.be.equal(arr.length);

    for (const x in arr) {
      expect(clonedArr[x]).to.be.equal(arr[x]);
    }
  });
});
