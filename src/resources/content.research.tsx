import {
  ConferencePresentation,
  ResearchAbout,
  ResearchContact,
  ResearchCV,
  ResearchHome,
  ResearchPublications,
  ResearchWork,
} from "@/types";
import { IconName } from "@/resources/icons";

import researchHomeData from "@/content/data/research/home.json";
import researchAboutData from "@/content/data/research/about.json";
import researchPublicationsData from "@/content/data/research/publications.json";
import researchCVData from "@/content/data/research/cv.json";
import researchContactData from "@/content/data/research/contact.json";
import researchWorkData from "@/content/data/research/work.json";
import conferencePresentationsData from "@/content/data/research/conferences.json";

// Research-profile content — lives under /research (plan.md §5).
// Copy/labels/links are sourced from src/content/data/research/*.json —
// edit those files, not this one. Every number here must be traceable to a
// real paper (plan.md §12).

const researchHome: ResearchHome = researchHomeData as ResearchHome;

const researchAbout: ResearchAbout = {
  ...researchAboutData,
  icon: researchAboutData.icon as IconName,
};

const researchPublications: ResearchPublications = {
  ...researchPublicationsData,
  icon: researchPublicationsData.icon as IconName,
};

const researchCV: ResearchCV = {
  ...researchCVData,
  icon: researchCVData.icon as IconName,
};

const researchContact: ResearchContact = researchContactData as ResearchContact;

const researchWork: ResearchWork = researchWorkData as ResearchWork;

const conferencePresentations: ConferencePresentation[] = conferencePresentationsData;

export {
  researchHome,
  researchAbout,
  researchPublications,
  researchCV,
  researchContact,
  researchWork,
  conferencePresentations,
};
