"use client";

import Link from "next/link";

import {
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type DropdownItem = {
  label: string;
  href: string;
};

type DropdownMenuProps = {
  label: string;
  items: DropdownItem[];
};

export function DropdownMenu({
  label,
  items,
}: DropdownMenuProps) {
  const [open, setOpen] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() =>
        setOpen(true)
      }
      onMouseLeave={() =>
        setOpen(false)
      }
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-64 rounded-card border border-gray-200 bg-white p-2 shadow-lg animate-slideDown">
          <div className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-button px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}