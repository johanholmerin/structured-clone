import structuredClone from "../index.js";

const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("binary data", function() {
  it("can clone a typed array", function() {
    const arr = new Int8Array(2);
    arr[0] = 32;
    const clonedArr = structuredClone(arr);

    expect(clonedArr).to.be.deep.equal(arr);
    expect(clonedArr).to.be.instanceof(Int8Array);
  });

  it("can clone a array buffer", function() {
    const arrBuff = new ArrayBuffer(2);
    const clonedArrBuff = structuredClone(arrBuff);

    expect(clonedArrBuff).to.be.deep.equal(arrBuff);
    expect(clonedArrBuff).to.be.instanceof(ArrayBuffer);
  });

  it("can clone a data view", function() {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setInt8(1, 42);
    const clonedDataView = structuredClone(dataView);

    expect(clonedDataView).to.be.deep.equal(dataView);
    expect(clonedDataView).to.be.instanceof(DataView);
  });
});
