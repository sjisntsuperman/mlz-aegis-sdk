export function nativeTrycatch(fn: () => void, errorFn: (err: any) => void) {
  try {
    fn();
  } catch (err) {
    console.error('err', err);
    if (errorFn) {
      errorFn(err);
    }
  }
}
