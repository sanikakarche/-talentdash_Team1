export async function generateStaticParams() {
  const companies = [
    "google",
    "amazon",
    "microsoft",
  ];

  const regions = ["in", "us", "uk"];

  return regions.flatMap((region) =>
    companies.map((slug) => ({
      region,
      slug,
    })),
  );
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ region: string; slug: string }>;
}) {
  const { region, slug } = await params;
  return (
    <div>
      <h1>Company: {slug}</h1>
      <p>Region: {region}</p>
    </div>
  );
}