type Company = {
  slug: string;

  industry?: string;

  size?: string;
};

export function getCompanyLinks(
  company: Company,
) {
  return {
    salaries: `/companies/${company.slug}/salaries`,

    reviews: `/companies/${company.slug}/reviews`,

    interviews: `/companies/${company.slug}/interviews`,

    jobs: `/companies/${company.slug}/jobs`,

    compare: `/companies/compare?company=${company.slug}`,
  };
}

export function getSalaryLinks(
  role: string,
  location: string,
  region?: string,
) {
  const prefix = region
    ? `/${region}`
    : "";

  const roleSlug =
    role
      .toLowerCase()
      .replaceAll(" ", "-");

  const locationSlug =
    location
      .toLowerCase()
      .replaceAll(" ", "-");

  return {
    byCompany: `${prefix}/salaries/${roleSlug}/${locationSlug}/companies`,

    byLevel: `${prefix}/salaries/${roleSlug}/${locationSlug}/levels`,

    heatmap: `${prefix}/salaries/heatmap?role=${roleSlug}`,

    compare: `${prefix}/offers/compare`,
  };
}

export function getRelatedRoles(
  role: string,
) {
  const roleMap:
    Record<
      string,
      string[]
    > = {
      "software engineer":
        [
          "Frontend Engineer",
          "Backend Engineer",
          "Full Stack Engineer",
        ],

      "product manager":
        [
          "Senior Product Manager",
          "Technical Product Manager",
          "Growth Product Manager",
        ],

      designer: [
        "Product Designer",
        "UX Designer",
        "UI Designer",
      ],
    };

  return (
    roleMap[
      role.toLowerCase()
    ] || []
  );
}

export function getRelatedCompanies(
  company: Company,
  companies: Company[],
) {
  return companies
    .filter(
      (candidate) =>
        candidate.slug !==
          company.slug &&
        candidate.industry ===
          company.industry,
    )
    .slice(0, 6);
}

export function getRelatedLocations(
  location: string,
) {
  const locationMap:
    Record<
      string,
      string[]
    > = {
      bangalore: [
        "Hyderabad",
        "Pune",
        "Chennai",
      ],

      london: [
        "Manchester",
        "Birmingham",
        "Edinburgh",
      ],

      "san francisco":
        [
          "Seattle",
          "New York",
          "Austin",
        ],
    };

  return (
    locationMap[
      location.toLowerCase()
    ] || []
  );
}

export function getBreadcrumbs(
  path: string,
) {
  const segments =
    path
      .split("/")
      .filter(Boolean);

  const crumbs = [
    {
      name: "Home",

      url: "/",
    },
  ];

  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    crumbs.push({
      name:
        segment
          .replaceAll("-", " ")
          .replace(
            /\b\w/g,
            (char) =>
              char.toUpperCase(),
          ),

      url: currentPath,
    });
  }

  return crumbs;
}