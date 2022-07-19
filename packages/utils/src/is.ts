const objectToString = Object.prototype.toString;

export function isError(wat: unknown): wat is Error {
  switch (objectToString.call(wat)) {
    case '[object Error]':
    case '[object Exception]':
    case '[object DOMException]':
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}

export function isType(type: string) {
  return function (value: any): boolean {
    return objectToString.call(value) == `[object ${type}]`;
  };
}

// export const variableDetation = {
//     isNumber: isType(t.Number)
// }

function isInstanceOf(a: any, b: any) {
  try {
    return a instanceof b;
  } catch (_) {
    return false;
  }
}
