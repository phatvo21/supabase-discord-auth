/** Error initialization options */
export interface ErrorOptions {
  /** Main logged message */
  message: string;
  /** If this error is wrapping another one, this will contain the original error */
  error?: Error;
  /** Additional contextual data for debugging */
  data?: any;
  /** Human-readable error message sent to the client */
  hint?: any;
}
