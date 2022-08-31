import { EnvelopeItem } from '@aegis/types';

export function makeEnvelope<T = EnvelopeItem>(envelope: T): T {
  return envelope;
}

export function serializeEnvelope(envelope: EnvelopeItem): EnvelopeItem {
  return envelope;
}
