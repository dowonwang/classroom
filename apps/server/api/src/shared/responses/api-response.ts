export type ApiResponseMeta = {
  unixTimestamp: number;
  requestId?: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  error: null;
  meta?: ApiResponseMeta;
};

export type ApiErrorDetail = {
  message: string;
  details?: unknown;
};

export type ApiErrorResponse = {
  success: false;
  data: null;
  error: ApiErrorDetail;
  meta?: ApiResponseMeta;
};

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;
