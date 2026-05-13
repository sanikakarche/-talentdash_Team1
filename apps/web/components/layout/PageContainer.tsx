import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  narrow?: boolean;
  sidebar?: boolean;
  className?: string;
};

export function PageContainer({
  children,
  narrow,
  sidebar,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow
          ? "max-w-4xl"
          : "max-w-7xl",
        sidebar &&
          "grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}