import { BrowserClient } from './client';
import { ErrorHandler, UnhandledRejectionHandler } from './integration';
import { DOMhandler } from './integration/dom';

const browserClient = new BrowserClient();

const plugins = [ErrorHandler, UnhandledRejectionHandler, DOMhandler];

browserClient.use(plugins);
