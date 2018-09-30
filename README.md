# Structured clone

A Javascript implementation of the structured clone algorithm.
Written in ES6, uses `Map` and `Array.from`.

No external dependencies.

## Usage

```javascript
import structuredClone from 'structured-clone';

const newObj = structuredClone(obj);
```

## Limitations

* `CryptoKey` is not supported, since there is no way to synchronously make a copy.
* Copying `FileList` is only supported in browsers that support the
  `DataTransfer` constructor.
