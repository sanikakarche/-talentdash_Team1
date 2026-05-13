type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-6 4h3m5 4H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A2 2 0 0114 3.586L18.414 8A2 2 0 0119 9.414V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-gray-900">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {action ? (
        <div className="mt-6">
          {action}
        </div>
      ) : null}
    </div>
  );
}