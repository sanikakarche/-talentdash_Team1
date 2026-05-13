export const RECURRING_JOBS = [
  {
    queueName: "salary-aggregation",

    jobName: "salary-aggregation",

    cron: "0 */6 * * *",

    payload: {
      triggeredBy: "cron",
    },
  },
] as const;