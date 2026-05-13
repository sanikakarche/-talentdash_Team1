import { z } from "zod";

export const salarySubmissionSchema =
  z.object({
    company: z
      .string()
      .min(2)
      .max(120),

    role: z
      .string()
      .min(2)
      .max(120),

    level: z
      .string()
      .min(1)
      .max(50),

    location: z
      .string()
      .min(2)
      .max(120),

    baseSalary: z
      .number()
      .positive(),

    stockGrant: z
      .number()
      .min(0),

    bonus: z
      .number()
      .min(0),

    totalCompensation: z
      .number()
      .positive(),

    currency: z
      .string()
      .length(3),

    yearsExperience: z
      .number()
      .min(0)
      .max(50),

    employmentType: z.enum([
      "FULL_TIME",
      "INTERN",
      "CONTRACT",
    ]),
  });

export type SalarySubmissionInput =
  z.infer<
    typeof salarySubmissionSchema
  >;