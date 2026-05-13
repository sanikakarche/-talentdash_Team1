type RegionPageProps = {
  params: Promise<{
    region: string;
  }>;
};

export default async function RegionPage({
  params,
}: RegionPageProps) {
  const { region } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div>
        <h1 className="text-5xl font-bold text-green-600">
          TalentDash
        </h1>

        <p className="mt-4 text-zinc-400">
          Region: {region.toUpperCase()}
        </p>
      </div>
    </main>
  );
}