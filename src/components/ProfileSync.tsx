"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Keeps data-profile on <html> in sync across client-side navigation.
// The inline script in layout.tsx handles the initial paint (see there for
// why it can't rely on this running first); this covers every route change
// after hydration, since Next's App Router doesn't reload the document.
export function ProfileSync() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-profile",
      pathname.startsWith("/dev") ? "dev" : "research",
    );
  }, [pathname]);

  return null;
}
