import { prisma as db } from "./client";

async function main() {
  console.log("Cleaning database...");

  await db.reviewHelpful.deleteMany();
  await db.workplaceReview.deleteMany();

  await db.interviewQuestionAnswer.deleteMany();
  await db.interviewQuestion.deleteMany();
  await db.interviewExperience.deleteMany();

  await db.forumReply.deleteMany();
  await db.forumThread.deleteMany();
  await db.forumCategory.deleteMany();

  await db.offerComparison.deleteMany();
  await db.offerEntry.deleteMany();

  await db.salaryHeatmap.deleteMany();
  await db.salaryAggregate.deleteMany();
  await db.salaryEntry.deleteMany();

  await db.companyBenefit.deleteMany();
  await db.companyStats.deleteMany();
  await db.workplaceRanking.deleteMany();

  await db.jobListing.deleteMany();

  await db.company.deleteMany();

  console.log("Database cleaned.");

  /**
   * CREATE COMPANY
   */

  const google = await db.company.upsert({
    where: {
      slug: "google",
    },

    update: {},

    create: {
      name: "Google",

      slug: "google",

      description: "Global technology company",

      website: "https://google.com",

      industry: "Technology",

      headquarters: "Mountain View, California",

      country: "United States",

      region: ["us", "global"],

      isVerified: true,

      isPublic: true,

      employeeCount: 180000,
    },
  });

  console.log("Company seeded:", google.name);

  /**
   * CREATE SALARY ENTRIES
   */

  await db.salaryEntry.createMany({
    data: [
      {
        companyId: google.id,

        role: "Software Engineer",

        jobTitle: "SDE II",

        level: "MID",

        baseSalary: 180000,

        totalComp: 240000,

        currency: "USD",

        normalizedUsdSalary: 240000,

        location: "San Francisco",

        city: "San Francisco",

        country: "United States",

        region: "us",

        skills: ["React", "TypeScript"],

        approvedAt: new Date(),
      },

      {
        companyId: google.id,

        role: "Software Engineer",

        jobTitle: "Senior Software Engineer",

        level: "SENIOR",

        baseSalary: 250000,

        totalComp: 340000,

        currency: "USD",

        normalizedUsdSalary: 340000,

        location: "San Francisco",

        city: "San Francisco",

        country: "United States",

        region: "us",

        skills: ["Distributed Systems", "Go", "Kubernetes"],

        approvedAt: new Date(),
      },
    ],
  });

  console.log("Salary entries seeded.");

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });