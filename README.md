# Structured clone

A Javascript implementation of the structured clone algorithm.

No external dependencies.

## Install

```sh
# Yarn
yarn add @johanholmerin/structured-clone

# npm
npm install @johanholmerin/structured-clone
```

## Usage

```javascript
import structuredClone from '@johanholmerin/structured-clone';

const newObj = structuredClone(obj);
```

## Limitations

- `CryptoKey` and `ImageBitmap` are not supported, since there is no way to
  synchronously make a copy.
- Copying `FileList` is only supported in browsers that support the
  `DataTransfer` constructor.
- Does not support the [transfer](https://html.spec.whatwg.org/multipage/structured-data.html#structured-cloning) parameter
