"use client";

type Props = {
  error: Error;

  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl">
          ⚠️
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
          Something went
          wrong
        </h1>

        <p className="mt-4 text-base leading-7 text-gray-600">
          We couldn't load
          this page right now.
          Please try again.
        </p>

        {process.env
          .NODE_ENV ===
          "development" && (
          <div className="mt-6 overflow-auto rounded-xl border border-red-100 bg-red-50 p-4 text-left text-sm text-red-700">
            {error.message}
          </div>
        )}

        <button
          onClick={reset}
          className="mt-8 rounded-button bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}