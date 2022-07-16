import { createTransport } from './';

function fill(global, key, cb) {
  const origin = global[key] as () => void;
  if (typeof origin == 'function') {
    try {
      wrapFunc(origin);
    } catch (error) {
      _sendAndCapture(error);
    }
  }
  global[key] = cb(origin);
}

function wrapFunc(cb) {
  try {
    cb();
  } catch (error) {
    _sendAndCapture(error);
  }
}

fill(window, 'fetch', originalFetch => {
  // const handleData = {};
  return originalFetch()
    .then(res => res)
    .catch(err => err);
});

export function makeFetchTransport(options, nativeFetch) {
  function makeRequest(request) {
    const requestOptions = {};
    return nativeFetch(requestOptions).then(response => ({
      statusCode: response.status,
      headers: {
        'aegis-limits': response.header.get('aegis-limits'),
        'retry-after': response.get('Retry-After'),
      },
    }));
  }
  return createTransport(options, makeRequest);
}
