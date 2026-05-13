import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@talentdash/db";

import {
  createSuccessResponse,
  AuthError,
  ValidationError,
  validateBody,
} from "@talentdash/utils";

import {
  salarySubmissionSchema,
  type SalarySubmissionInput,
} from "@talentdash/types";

import { apiHandler } from "@/lib/api-handler";

export async function POST(
  request: Request,
) {
  return apiHandler(async () => {
    /**
     * AUTH
     */

    const { userId } = await auth();

    if (!userId) {
      throw new AuthError();
    }

    /**
     * VALIDATE BODY
     */

    const body =
      await validateBody<SalarySubmissionInput>(
        salarySubmissionSchema,
        request,
      );

    /**
     * CREATE SUBMISSION
     */

    const submission =
      await db.salarySubmission.create({
        data: {
          userId,

          company:
            body.company,

          role:
            body.role,

          level:
            body.level,

          location:
            body.location,

          baseSalary:
            body.baseSalary,

          stockGrant:
            body.stockGrant,

          bonus:
            body.bonus,

          totalCompensation:
            body.totalCompensation,

          currency:
            body.currency,

          yearsExperience:
            body.yearsExperience,

          employmentType:
            body.employmentType,

          status:
            "PENDING",
        },
      });

    /**
     * RESPONSE
     */

    return createSuccessResponse({
      id: submission.id,
      status:
        submission.status,
    });
  });
}