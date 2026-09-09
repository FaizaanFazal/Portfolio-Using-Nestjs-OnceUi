"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import {
  routes,
  display,
  person,
  about,
  blog,
  work,
  gallery,
  researchAbout,
  researchPublications,
  researchCV,
} from "@/resources";
import { IconName } from "@/resources/icons";
import { ThemeToggle } from "./ThemeToggle";
import { CompactProfileSwitch } from "./CompactProfileSwitch";
import navData from "@/content/data/nav.json";
import styles from "./Header.module.scss";

// Nav order/active-match-mode is data-driven from nav.json; each entry's
// label/path/icon is sourced from that page's own content JSON so there is
// a single source of truth per page (plan.md §7 JSON content refactor).
const PAGE_MAP = { about, work, blog, gallery, researchAbout, researchPublications, researchCV };
type PageKey = keyof typeof PAGE_MAP;

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const isResearch = pathname.startsWith("/research");
  const isProfileHome = pathname === "/research" || pathname === "/dev";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade hide s={{ hide: false }} fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex s={{ hide: true }}>{person.location}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {/* Home always returns to the profile gate, not the current
                  profile's own landing page — it's a "start over" control. */}
              <ToggleButton prefixIcon={navData.home.icon as IconName} href="/" selected={pathname === "/"} />
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {(isResearch ? navData.research : navData.dev).map((item) => {
                const page = PAGE_MAP[item.key as PageKey];
                if (!page || !routes[page.path as keyof typeof routes]) return null;
                const selected =
                  item.matchMode === "startsWith"
                    ? pathname.startsWith(page.path)
                    : pathname === page.path;
                return (
                  <ToggleButton
                    key={item.key}
                    prefixIcon={page.icon}
                    href={page.path}
                    label={page.label}
                    selected={selected}
                  />
                );
              })}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
            {!isProfileHome && <CompactProfileSwitch />}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
