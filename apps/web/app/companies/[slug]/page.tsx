type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CompanyPage({
  params,
}: CompanyPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-green-600">
        Company: {slug}
      </h1>
    </main>
  );
}