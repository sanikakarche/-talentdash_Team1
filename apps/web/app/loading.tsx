export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl animate-pulse text-center">
            <div className="mx-auto h-6 w-40 rounded bg-gray-200" />

            <div className="mx-auto mt-8 h-16 w-full max-w-3xl rounded bg-gray-200" />

            <div className="mx-auto mt-6 h-6 w-full max-w-2xl rounded bg-gray-100" />

            <div className="mx-auto mt-10 h-40 w-full rounded-2xl bg-gray-100" />

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {Array.from({
                length: 5,
              }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-10 w-32 rounded-full bg-gray-100"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GRID SECTIONS */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="h-5 w-40 rounded bg-gray-200" />

            <div className="mt-4 h-10 w-80 rounded bg-gray-100" />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Array.from({
                length: 3,
              }).map(
                (
                  _,
                  cardIndex,
                ) => (
                  <div
                    key={
                      cardIndex
                    }
                    className="h-52 rounded-xl bg-gray-100"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}