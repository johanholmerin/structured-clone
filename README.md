# Structured clone

A Javascript implementation of the structured clone algorithm.

No external dependencies.

## Install

```sh
 yarn add git+https://github.com/johanholmerin/structured-clone#semver:^1.0.0
```

## Usage

```javascript
import structuredClone from 'structured-clone';

const newObj = structuredClone(obj);
```

## Limitations

* `CryptoKey` is not supported, since there is no way to synchronously make a copy.
* Copying `FileList` is only supported in browsers that support the
  `DataTransfer` constructor.
