import { nanoid } from "nanoid";

export type ApiError = {
  code: string;
  message: string;
  field?: string;
};

export type ApiMeta = {
  requestId: string;
  timestamp: string;
  region?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  meta: ApiMeta;
};

export function createSuccessResponse<T>(
  data: T,
  region?: string,
): ApiResponse<T> {
  return {
    success: true,

    data,

    error: null,

    meta: {
      requestId: nanoid(),
      timestamp: new Date().toISOString(),
      region,
    },
  };
}

export function createErrorResponse(
  error: ApiError,
  region?: string,
): ApiResponse<null> {
  return {
    success: false,

    data: null,

    error,

    meta: {
      requestId: nanoid(),
      timestamp: new Date().toISOString(),
      region,
    },
  };
}