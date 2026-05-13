"use client";

import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavDrawerProps = {
  items: NavItem[];
};

export function MobileNavDrawer({
  items,
}: MobileNavDrawerProps) {
  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() =>
          setOpen(true)
        }
        className="inline-flex items-center justify-center rounded-button border border-gray-200 bg-white p-2 text-gray-700 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setOpen(false)
            }
          />

          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  TalentDash
                </p>

                <p className="text-xs text-gray-500">
                  Explore. Compare.
                  Grow.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() =>
                  setOpen(false)
                }
                className="rounded-button border border-gray-200 p-2 text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="rounded-button px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="rounded-button border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-button bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}