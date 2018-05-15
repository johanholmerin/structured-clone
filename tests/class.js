import structuredClone from '../index.js';

describe('class', function() {
  class WithProperties {
    constructor() {
      this.property = 'value';
    }
  }

  class WithMethod {
    constructor() {
      this.method = function() {};
    }
  }

  const withProperties = new WithProperties();
  const withPropertiesClone = structuredClone(withProperties);

  it('fails to clone methods', function() {
    const withMethod = new WithMethod();
    expect(() => structuredClone(withMethod)).to.throw();
  });

  it('has the same properties own', function() {
    expect(withPropertiesClone).to.have.own.deep.equal(withProperties);
  });

  it('is not instanceof', function() {
    expect(withPropertiesClone).to.not.be.an.instanceof(WithProperties);
  });
});
