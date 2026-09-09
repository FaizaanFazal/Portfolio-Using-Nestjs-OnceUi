"use client";

import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RouteGuard } from "./RouteGuard";

// The profile gate at "/" is a full-viewport, no-scroll, chrome-free screen
// (plan.md §3.2) — it supplies its own name/location text and has no
// "current profile" yet to switch from, so the standard Header/Footer and
// page padding don't apply there.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGate = pathname === "/";

  if (isGate) {
    return <RouteGuard>{children}</RouteGuard>;
  }

  return (
    <>
      {/* Top breathing room for the floating pill header, hidden on mobile
          where Header switches to a bottom-anchored fixed bar instead (see
          Header.module.scss) and doesn't need it. Lives here rather than in
          the root layout so the header-less Gate route — which renders
          nothing else from this component — never gets it either; it used
          to, which pushed the Gate's full-height screen past 100dvh and
          forced a scrollbar with blank space above the panels. */}
      <Flex fillWidth minHeight="16" s={{ hide: true }} />
      <Header />
      <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
        <Flex horizontal="center" fillWidth minHeight="0">
          <RouteGuard>{children}</RouteGuard>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
