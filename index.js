const SUPPORTS_DATATRANSFER = (() => {
  try {
    new DataTransfer();
    return true;
  } catch (_) {
    return false;
  }
})();
const SUPPORTS_FILE = typeof File !== "undefined";
const SUPPORTS_BLOB = typeof Blob !== "undefined";
const SUPPORTS_FILELIST = typeof FileList !== "undefined";
const SUPPORTS_ARRAYBUFFER = typeof ArrayBuffer !== "undefined";
const SUPPORTS_DATAVIEW = typeof DataView !== "undefined";
const SUPPORTS_IMAGEDATA = typeof ImageData !== "undefined";
const SUPPORTS_MAP = typeof Map !== "undefined";
const SUPPORTS_SET = typeof Set !== "undefined";
const SUPPORTS_DOMMATRIX = typeof DOMMatrix !== "undefined";
const SUPPORTS_DOMPOINT = typeof DOMPoint !== "undefined";
const SUPPORTS_DOMQUAD = typeof DOMQuad !== "undefined";
const SUPPORTS_DOMRECT = typeof DOMRect !== "undefined";

// Primitives types except Symbol
const PRIMITIVE_TYPES = ["undefined", "boolean", "number", "string"];

// For cyclic objects
const map = new Map();

export default function structuredClone(obj) {
  const newObj = clone(obj);
  map.clear();
  return newObj;
}

function clone(obj) {
  if (isPrimitive(obj)) {
    return obj;
  }

  if (!map.has(obj)) {
    cloneObject(obj, newObj => {
      map.set(obj, newObj);
    });
  }

  return map.get(obj);
}

function cloneObject(obj, set) {
  if (obj instanceof Date) {
    set(new Date(obj));
  } else if (obj instanceof String) {
    set(new String(obj));
  } else if (obj instanceof Boolean) {
    set(new Boolean(obj));
  } else if (obj instanceof Number) {
    set(new Number(obj));
  } else if (obj instanceof RegExp) {
    set(new RegExp(obj));
  } else if (SUPPORTS_FILE && obj instanceof File) {
    set(
      new File([obj], obj.name, {
        type: obj.type,
        lastModified: obj.lastModified
      })
    );
  } else if (SUPPORTS_BLOB && obj instanceof Blob) {
    set(obj.slice(0, obj.size, obj.type));
  } else if (SUPPORTS_FILELIST && obj instanceof FileList) {
    if (SUPPORTS_DATATRANSFER) {
      const dataTransfer = new DataTransfer();
      for (const file of obj) {
        dataTransfer.items.add(clone(file));
      }
      set(dataTransfer.files);
    } else {
      // Fall back to a normal array if DataTransfer is not supported
      const newObj = [];
      set(newObj);
      for (const file of obj) {
        newObj.push(clone(file));
      }
    }
  } else if (SUPPORTS_ARRAYBUFFER && obj instanceof ArrayBuffer) {
    set(obj.slice(0));
  } else if (SUPPORTS_DATAVIEW && obj instanceof DataView) {
    set(new DataView(obj.buffer, obj.byteOffset, obj.byteLength));
  } else if (SUPPORTS_ARRAYBUFFER && ArrayBuffer.isView(obj)) {
    set(obj.slice());
  } else if (SUPPORTS_IMAGEDATA && obj instanceof ImageData) {
    set(new ImageData(obj.data, obj.width, obj.height));
  } else if (SUPPORTS_DOMMATRIX && obj instanceof DOMMatrix) {
    set(obj.scale(1));
  } else if (SUPPORTS_DOMPOINT && obj instanceof DOMPoint) {
    set(new DOMPoint(obj.x, obj.y, obj.z, obj.w));
  } else if (SUPPORTS_DOMQUAD && obj instanceof DOMQuad) {
    set(new DOMQuad(obj.p1, obj.p2, obj.p3, obj.p4));
  } else if (SUPPORTS_DOMRECT && obj instanceof DOMRect) {
    set(DOMRect.fromRect(obj));
  } else if (Array.isArray(obj)) {
    const newObj = [];
    set(newObj);
    obj.forEach(item => newObj.push(clone(item)));
  } else if (SUPPORTS_MAP && obj instanceof Map) {
    const newObj = new Map();
    set(newObj);
    Array.from(obj.entries()).forEach(([key, value]) => {
      newObj.set(clone(key), clone(value));
    });
  } else if (SUPPORTS_SET && obj instanceof Set) {
    const newObj = new Set();
    set(newObj);
    Array.from(obj.values()).forEach(item => newObj.add(clone(item)));
  } else if (isObject(obj)) {
    const newObj = {};
    set(newObj);
    Object.keys(obj).forEach(key => {
      newObj[key] = clone(obj[key]);
    });
  } else {
    throw new Error(`Unsupported object ${String(obj)}`);
  }
}

function isObject(obj) {
  const proto = Object.getPrototypeOf(obj);
  return (
    proto === null || Object.prototype.toString.call(obj) === "[object Object]"
  );
}

function isPrimitive(item) {
  return item === null || PRIMITIVE_TYPES.includes(typeof item);
}
