import structuredClone from '../index.js';

describe('property descriptor', function() {
  it('does not clone setters/getters', function() {
    const value = 'value';
    const obj = { prop: '' };
    Object.defineProperty(obj, 'prop', {
      get() {
        return value;
      },
      set(_) {}
    });
    const clonedObj = structuredClone(obj);
    const clonedObjDesc = Object.getOwnPropertyDescriptor(clonedObj, 'prop');

    expect(clonedObjDesc.set).to.equal(undefined);
    expect(clonedObjDesc.get).to.equal(undefined);
    expect(clonedObjDesc.value).to.equal(value);
  });

  it('does not clone description', function() {
    const value = 'value';
    const obj = { prop: '' };
    Object.defineProperty(obj, 'prop', {
      value,
      writable: false,
      configurable: false
    });
    const clonedObj = structuredClone(obj);
    const clonedObjDesc = Object.getOwnPropertyDescriptor(clonedObj, 'prop');

    expect(clonedObjDesc.writable).to.equal(true);
    expect(clonedObjDesc.configurable).to.equal(true);
    expect(clonedObjDesc.value).to.equal(value);
  });
});
