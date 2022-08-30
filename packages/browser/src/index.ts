import { BrowserOptionsFieldsType } from '@aegis/types/src';
import { BrowserClient } from './client';
import { DOMhandler, ErrorHandler, UnhandledRejectionHandler } from './integration';

function createInstance(options: BrowserOptionsFieldsType) {
  const browser = new BrowserClient(options);
  const plugins = [DOMhandler, ErrorHandler, UnhandledRejectionHandler];
  browser.use(plugins);
  return browser;
}

export { BrowserClient, createInstance };
