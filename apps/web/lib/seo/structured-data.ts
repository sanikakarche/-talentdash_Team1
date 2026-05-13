const SITE_URL =
  "https://talentdash.com";

export function buildOrganizationSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    name: "TalentDash",

    url: SITE_URL,

    logo: `${SITE_URL}/logo.png`,

    sameAs: [
      "https://linkedin.com/company/talentdash",
      "https://twitter.com/talentdash",
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context":
      "https://schema.org",

    "@type": "WebSite",

    name: "TalentDash",

    url: SITE_URL,

    potentialAction: {
      "@type":
        "SearchAction",

      target: `${SITE_URL}/search?q={search_term_string}`,

      "query-input":
        "required name=search_term_string",
    },
  };
}

export function buildCompanySchema(
  company: {
    name: string;

    slug: string;

    description?: string;

    logoUrl?: string;

    rating?: number;

    reviewCount?: number;
  },
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    name: company.name,

    url: `${SITE_URL}/companies/${company.slug}`,

    description:
      company.description,

    logo:
      company.logoUrl,

    aggregateRating:
      company.rating
        ? {
            "@type":
              "AggregateRating",

            ratingValue:
              company.rating,

            reviewCount:
              company.reviewCount ||
              0,
          }
        : undefined,
  };
}

export function buildSalarySchema(
  role: string,
  location: string,
  data: {
    medianBase: number;

    currency: string;
  },
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "Occupation",

    name: role,

    occupationLocation: {
      "@type":
        "City",

      name: location,
    },

    estimatedSalary: {
      "@type":
        "MonetaryAmountDistribution",

      currency:
        data.currency,

      median:
        data.medianBase,
    },
  };
}

export function buildJobPostingSchema(
  job: {
    title: string;

    description: string;

    company: string;

    location: string;

    salary?: number;

    currency?: string;

    postedAt: string;
  },
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "JobPosting",

    title: job.title,

    description:
      job.description,

    hiringOrganization: {
      "@type":
        "Organization",

      name: job.company,
    },

    jobLocation: {
      "@type":
        "Place",

      address: {
        "@type":
          "PostalAddress",

        addressLocality:
          job.location,
      },
    },

    datePosted:
      job.postedAt,

    baseSalary:
      job.salary
        ? {
            "@type":
              "MonetaryAmount",

            currency:
              job.currency ||
              "USD",

            value: {
              "@type":
                "QuantitativeValue",

              value:
                job.salary,

              unitText:
                "YEAR",
            },
          }
        : undefined,
  };
}

export function buildReviewSchema(
  review: {
    title: string;

    content: string;

    rating: number;

    author: string;
  },

  company: {
    name: string;
  },
) {
  return {
    "@context":
      "https://schema.org",

    "@type": "Review",

    reviewRating: {
      "@type":
        "Rating",

      ratingValue:
        review.rating,
    },

    author: {
      "@type":
        "Person",

      name: review.author,
    },

    itemReviewed: {
      "@type":
        "Organization",

      name: company.name,
    },

    reviewBody:
      review.content,

    name: review.title,
  };
}

export function buildFAQSchema(
  faqs: {
    q: string;

    a: string;
  }[],
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "FAQPage",

    mainEntity:
      faqs.map((faq) => ({
        "@type":
          "Question",

        name: faq.q,

        acceptedAnswer: {
          "@type":
            "Answer",

          text: faq.a,
        },
      })),
  };
}

export function buildBreadcrumbSchema(
  crumbs: {
    name: string;

    url: string;
  }[],
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement:
      crumbs.map(
        (
          crumb,
          index,
        ) => ({
          "@type":
            "ListItem",

          position:
            index + 1,

          name:
            crumb.name,

          item: `${SITE_URL}${crumb.url}`,
        }),
      ),
  };
}

export function buildArticleSchema(
  thread: {
    title: string;

    content: string;

    slug: string;

    author: string;

    createdAt: string;
  },
) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "Article",

    headline:
      thread.title,

    articleBody:
      thread.content,

    author: {
      "@type":
        "Person",

      name: thread.author,
    },

    datePublished:
      thread.createdAt,

    mainEntityOfPage: `${SITE_URL}/forum/${thread.slug}`,
  };
}