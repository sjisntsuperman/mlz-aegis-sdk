import { getGlobalObject } from '../../src/object';

describe('get global', () => {
  test('should return global object', () => {
    const backup = global.process;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.process;
    const a = getGlobalObject();
    const b = getGlobalObject();
    expect(a).toEqual(b);
    global.process = backup;
  });
});
