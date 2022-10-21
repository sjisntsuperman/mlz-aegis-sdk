const sdk = Aegis.createInstance({
  dsn: 'http://localhost:3000/test',
});

function sendMsg() {
  console.log(1239123);
}
sdk.log({
  msg: '345345345',
});
