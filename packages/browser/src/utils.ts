export function makeDsn(dsn: string): string {
  if (dsn.includes('xxx')) {
    return 'xxx' + dsn;
  }

  return dsn;
}
