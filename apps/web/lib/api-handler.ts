import { NextResponse } from "next/server";

import {
  AppError,
  createErrorResponse,
} from "@talentdash/utils";

export async function apiHandler<T>(
  handler: () => Promise<T>,
) {
  try {
    const data = await handler();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
      return NextResponse.json(
        createErrorResponse({
          code: error.code,
          message: error.message,
          field: error.field,
        }),
        {
          status: error.statusCode,
        },
      );
    }

    return NextResponse.json(
      createErrorResponse({
        code: "INTERNAL_SERVER_ERROR",
        message:
          "Something went wrong",
      }),
      {
        status: 500,
      },
    );
  }
}