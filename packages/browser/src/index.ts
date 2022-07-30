import { getCurrentHub } from './client';
import { GlobalHandlers } from './integration';
import { TryCatch } from './integration/trycatch';

const defaultIntegrations = [new GlobalHandlers(), new TryCatch()];

const hub = getCurrentHub();
