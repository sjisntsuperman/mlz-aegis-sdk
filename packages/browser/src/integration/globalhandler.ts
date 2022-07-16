enum ERROR_TYPES {
  RESOURCE_ERROR,
  JS_ERROR,
  UNHANDLED_ERROR,
  CONSOLE_ERROR,
  XHR_ERROR,
  FETCH_ERROR,
}

class GlobalHandlers {
  private _installFunc = {
    error: _installGlobalOnErrorHandler,
    unhandledexception: _unhandlExceptionErrorHandler,
  };

  constructor(options) {
    this._installFunc = {
      ...this._installFunc,
      ...options,
    };
    this.init();
  }

  init() {
    Object.keys(this._installFunc).forEach(it => {
      this._installFunc[it]();
      this._installFunc[it] = undefined;
    });
  }
}

function _installGlobalOnErrorHandler() {
  const handler = (event: any) => {
    const { error } = event;

    let exception = null;
    if (error.localName) {
      exception = _resourceErrorCapture(event);
    } else {
      exception = _jsErrorCapture(event);
    }

    _sendAndCapture(exception);
  };
  window.addEventListener('error', handler, true);
}

function _unhandlExceptionErrorHandler() {
  const handler = event => {
    const exception = null;
    // todo
    _sendAndCapture(exception);
  };
  window.addEventListener('unhandledrejection', handler);
}

// todo
function _sendAndCapture(exception) {}

function _resourceErrorCapture(event) {
  const { msg } = event;
  return {
    tag: '',
    type: ERROR_TYPES.RESOURCE_ERROR,
    msg,
  };
}

function _jsErrorCapture(event) {
  const { msg } = event;
  return {
    tag: '',
    type: ERROR_TYPES.JS_ERROR,
    msg,
  };
}
