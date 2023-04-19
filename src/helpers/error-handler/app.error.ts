import {ErrorOptions} from './error.types';

/**
 * Base error type for app related errors
 */
export class AppError extends Error {
  /** If this error is wrapping another one, this will contain the original error */
  public error?: Error;
  /** Additional contextual data for debugging */
  public data?: unknown;
  /** Human-readable error message sent to the client */
  public hint?: unknown;

  /** Create an EngineError, these errors represent errors in the engine itself */
  public constructor(config: ErrorOptions | string) {
    const options: ErrorOptions = typeof config === 'string' ? {message: config} : config;
    super(options.message);

    this.data = options.data;
    this.error = options.error;
    this.hint = options.hint;
  }
}
