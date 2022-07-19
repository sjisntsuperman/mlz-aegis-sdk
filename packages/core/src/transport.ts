class Transport {
  constructor() {}

  send(error, envelope) {
    const defaultEnvelope = {};
    const dsn = '';
  }
}

export function sendReport(data: any) {
  const beacon = window.navigator.sendBeacon;
  // todo: 若不支持 beacon 申请降级 xhr
  return beacon(data);
}
