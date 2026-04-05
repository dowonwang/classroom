export interface ApiResponseMeta {
  unixTimestamp: number;
  requestId?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: null;
  meta?: ApiResponseMeta;
}

export interface ApiErrorDetail {
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: ApiErrorDetail;
  meta?: ApiResponseMeta;
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;
