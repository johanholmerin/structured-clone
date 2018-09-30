import structuredClone from "../index.js";

describe("object", function() {
  // From w3c/web-platform-tests
  const origObj = {
    nulldata: null,
    udefdata: window.undefined,
    booldata: true,
    numdata: 1,
    strdata: "string data",
    boolobj: new Boolean(true),
    numobj: new Number(1),
    strobj: new String("string data"),
    datedata: new Date(),
    regdata: /a/g,
    arrdata: [1],
    sparsearray: [, , 3],
    map: new Map([[1, 2]]),
    set: new Set([1])
  };
  origObj.regdata.lastIndex = 1;
  origObj.looped = origObj;

  let clonedObj;

  it("clones", function() {
    expect(() => (clonedObj = structuredClone(origObj))).to.not.throw();
  });

  it("is not equal", function() {
    expect(clonedObj).to.not.be.equal(origObj);
  });

  it("is deep equal", function() {
    expect(clonedObj).to.be.deep.equal(origObj);
  });

  it("does not clone RegExp lastIndex ", function() {
    expect(clonedObj.regdata.lastIndex).to.equal(0);
  });
});
