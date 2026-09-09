import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: string;
  /** Description of the newsletter */
  description: string;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
  /** Icon used when this page appears in the header nav (nav.json references pages by key) */
  icon?: IconName;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: string;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: string;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** Short "how I work" block — concrete, no bullet-list padding (plan.md §6) */
  howIWork: {
    display: boolean;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: string;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: string[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: string;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description: string;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Topic color code for publications — dot color, filter chips, everywhere
 * else the code should run once introduced (plan.md §5.3).
 */
export type PublicationTopic =
  | "segmentation"
  | "survival"
  | "genetics"
  | "explainability"
  | "classification"
  | "benchmarking";

/**
 * Publication status — grouping for the publications list (plan.md §5.2).
 */
export type PublicationStatus =
  | "published-international"
  | "published-domestic"
  | "under-review";

/**
 * A conference presentation — not a full MDX entry, just a line item
 * (plan.md §5.2 "Conferences, first author").
 */
export type ConferencePresentation = {
  name: string;
  year: number;
  note?: string;
};

/**
 * Research-profile home page configuration (plan.md §5.1).
 */
export interface ResearchHome extends BasePageConfig {
  /** One-line positioning statement — capability + domain + credibility claim */
  positioningStatement: string;
  /** Evidence strip — four real, verbatim figures */
  evidence: Array<{
    figure: string;
    label: string;
  }>;
  /** Selected work — publication slugs to feature as cards, in order */
  selectedWork: string[];
  /** ~150 word research statement, not a bio — a position */
  researchStatement: string;
}

/**
 * Research-profile about page configuration (plan.md §5.5).
 */
export interface ResearchAbout extends BasePageConfig {
  bio: string;
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    timeframe: string;
    detail?: string;
  }>;
  position: {
    title: string;
    institution: string;
    department: string;
    timeframe: string;
  };
  award: {
    title: string;
    institution: string;
    year: string;
  };
  skills: {
    title: string;
    items: string[];
  };
  languages: Array<{
    name: string;
    level: string;
  }>;
}

/**
 * Research-profile publications page configuration (plan.md §5.2).
 */
export interface ResearchPublications extends BasePageConfig {
  heading: string;
}

/**
 * Research-profile CV page configuration (plan.md §5.6).
 */
export interface ResearchCV extends BasePageConfig {
  pdfHref: string;
}

/**
 * Research-profile contact page configuration.
 */
export interface ResearchContact extends BasePageConfig {
  heading: string;
  body: string;
}

/**
 * Research-profile paper case studies index (/research/work), mirroring
 * the dev profile's Work config (plan.md §5.4).
 */
export interface ResearchWork extends BasePageConfig {
  heading: string;
  /** Intro paragraph; `{{publicationsLink}}` is replaced with a link built from `publicationsLinkText` */
  introTemplate: string;
  publicationsLinkText: string;
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}
