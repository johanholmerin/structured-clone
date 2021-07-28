import structuredClone from "../index.js";

const { describe, it, before } = intern.getPlugin("interface.bdd");
const { expect } = intern.getPlugin("chai");

describe("error", function() {
  it("supports cloning errors", function() {
    const error = new Error("test_error");
    const clonedError = structuredClone(error);

    expect(clonedError).not.to.equal(error);
    expect(clonedError).to.be.an.instanceOf(Error);
    expect(clonedError.constructor).to.equal(error.constructor);
    expect(clonedError.message).to.equal(error.message);
    expect(clonedError.name).to.equal(error.name);
    expect(clonedError.stack).to.equal(error.stack);
  });

  it("Empty Error objects can be cloned", function() {
    const error = new Error();
    expect(error.hasOwnProperty("message")).to.be.false;
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(Error.prototype);
    expect(clonedError.constructor).equal(Error);
    expect(clonedError.name).equal("Error");
    expect(clonedError.hasOwnProperty("message")).to.be.false;
    expect(clonedError.foo).equal(undefined);
  });

  it("Error objects can be cloned", function() {
    const error = Error("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(Error.prototype);
    expect(clonedError.constructor).equal(Error);
    expect(clonedError.name).equal("Error");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("EvalError objects can be cloned", function() {
    const error = EvalError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(EvalError.prototype);
    expect(clonedError.constructor).equal(EvalError);
    expect(clonedError.name).equal("EvalError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("RangeError objects can be cloned", function() {
    const error = RangeError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(RangeError.prototype);
    expect(clonedError.constructor).equal(RangeError);
    expect(clonedError.name).equal("RangeError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("ReferenceError objects can be cloned", function() {
    const error = ReferenceError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(ReferenceError.prototype);
    expect(clonedError.constructor).equal(ReferenceError);
    expect(clonedError.name).equal("ReferenceError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("SyntaxError objects can be cloned", function() {
    const error = SyntaxError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(SyntaxError.prototype);
    expect(clonedError.constructor).equal(SyntaxError);
    expect(clonedError.name).equal("SyntaxError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("TypeError objects can be cloned", function() {
    const error = TypeError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(TypeError.prototype);
    expect(clonedError.constructor).equal(TypeError);
    expect(clonedError.name).equal("TypeError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("URIError objects can be cloned", function() {
    const error = URIError("some message");
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(URIError.prototype);
    expect(clonedError.constructor).equal(URIError);
    expect(clonedError.name).equal("URIError");
    expect(clonedError.message).equal("some message");
    expect(clonedError.foo).equal(undefined);
  });

  it("Cloning a modified Error", function() {
    const error = URIError("some message");
    Object.setPrototypeOf(error, SyntaxError.prototype);
    error.message = { toString: () => "another message" };
    error.constructor = RangeError;
    error.name = "TypeError";
    error.foo = "bar";
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(TypeError.prototype);
    expect(clonedError.constructor).equal(TypeError);
    expect(clonedError.name).equal("TypeError");
    expect(clonedError.message).equal("another message");
    expect(clonedError.foo).equal(undefined);
  });

  it("Error.message: getter is ignored when cloning", function() {
    const error = Error();
    Object.defineProperty(error, "message", { get: () => "hello" });
    expect(error.message).equal("hello");
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(Error.prototype);
    expect(clonedError.constructor).equal(Error);
    expect(clonedError.name).equal("Error");
    expect(clonedError.hasOwnProperty("message")).to.be.false;
    expect(clonedError.foo).equal(undefined);
  });

  it("Error.message: undefined property is stringified", function() {
    const error = Error();
    error.message = undefined;
    expect(error.message).equal(undefined);
    const clonedError = structuredClone(error);

    expect(Object.getPrototypeOf(clonedError)).equal(Error.prototype);
    expect(clonedError.constructor).equal(Error);
    expect(clonedError.name).equal("Error");
    expect(clonedError.message).equal("undefined");
    expect(clonedError.foo).equal(undefined);
  });

  describe("DOMException", function() {
    before(function(suite) {
      if (typeof DOMException === "undefined") {
        suite.skip();
      }
    });

    it("objects can be cloned", function() {
      const error = new DOMException("some message", "IndexSizeError");
      const clonedError = structuredClone(error);

      expect(Object.getPrototypeOf(clonedError)).equal(DOMException.prototype);
      expect(clonedError.constructor).equal(DOMException);
      expect(clonedError.name).equal("IndexSizeError");
      expect(clonedError.message).equal("some message");
      expect(clonedError.code).equal(DOMException.INDEX_SIZE_ERR);
      expect(clonedError.foo).equal(undefined);
    });
  });
});
