export type AppErrorOptions = {
  code: string;
  status: number;
  message: string;
  userMessage: string;
  details?: unknown;
  cause?: unknown;
};

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly userMessage: string;
  public readonly details?: unknown;
  public override readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = this.constructor.name;
    this.code = options.code;
    this.status = options.status;
    this.userMessage = options.userMessage;
    this.details = options.details;
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
