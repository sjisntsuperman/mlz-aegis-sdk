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

export function wrap(fn: unknown): void {
  if (!fn || typeof fn !== 'function') {
    return;
  }

  nativeTrycatch(fn as () => void, err => {
    console.error(err);
  });
}
