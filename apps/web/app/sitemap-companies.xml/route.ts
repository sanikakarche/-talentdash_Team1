import { db } from "@talentdash/db";

const SITE_URL =
  "https://talentdash.com";

export async function GET() {
  const companies =
    await db.company.findMany({
      select: {
        slug: true,

        updatedAt: true,
      },
    });

  const regions = [
    "",
    "/in",
    "/us",
    "/uk",
  ];

  const urls =
    companies.flatMap(
      (company) =>
        regions.map(
          (region) => `
  <url>
    <loc>${SITE_URL}${region}/companies/${company.slug}</loc>
    <lastmod>${company.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`,
        ),
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls.join("")}
</urlset>`;

  return new Response(
    sitemap,
    {
      headers: {
        "Content-Type":
          "application/xml",
      },
    },
  );
}