import structuredClone from "../index.js";

const { describe, it } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("uncloneables", function() {
  it("can not clone a Promise", function() {
    expect(() => structuredClone(Promise.resolve())).to.throw();
  });

  it("can not clone a function", function() {
    expect(() => structuredClone(function() {})).to.throw();
  });

  it("can not clone a Error", function() {
    expect(() => structuredClone(new Error())).to.throw();
  });

  it("can not clone a Symbol", function() {
    expect(() => structuredClone(new Symbol())).to.throw();
  });
});
