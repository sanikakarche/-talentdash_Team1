import { ZodSchema } from "zod";

import { ValidationError } from "./errors";

export async function validateBody<T>(
  schema: ZodSchema<T>,
  request: Request,
): Promise<T> {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    const issue = result.error.issues[0];

    throw new ValidationError(
      issue.message,
      issue.path.join("."),
    );
  }

  return result.data;
}