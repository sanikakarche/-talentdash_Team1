type SalariesPageProps = {
  params: Promise<{
    region: string;
  }>;
};

export default async function SalariesPage({
  params,
}: SalariesPageProps) {
  const { region } = await params;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-green-600">
        Salaries
      </h1>

      <p className="mt-4 text-zinc-400">
        Region cache key: {region}
      </p>
    </main>
  );
}