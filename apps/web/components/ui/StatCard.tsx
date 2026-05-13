type StatCardProps = {
  icon?: React.ReactNode;
  value: string;
  label: string;
  description?: string;
};

export function StatCard({
  icon,
  value,
  label,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-card border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
      {icon ? (
        <div className="mb-4 text-green-600">
          {icon}
        </div>
      ) : null}

      <div className="text-3xl font-semibold tracking-tight tabular-nums text-gray-900">
        {value}
      </div>

      <div className="mt-2 text-sm font-medium text-gray-700">
        {label}
      </div>

      {description ? (
        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}