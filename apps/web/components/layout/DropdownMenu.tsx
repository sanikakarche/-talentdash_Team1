"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DropdownItem = { label: string; href: string };
type DropdownMenuProps = { label: string; items: DropdownItem[] };

export function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          <div className="absolute -top-2 left-0 h-2 w-full" />
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}