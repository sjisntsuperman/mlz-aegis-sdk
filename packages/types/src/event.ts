export interface EventHint {
  eventId?: string;
  //   captureContext?: CaptureContext;
  syntheticException?: Error | null;
  originalException?: Error | string | null;
  //   attachments?: Attachment[];
  data?: any;
}
