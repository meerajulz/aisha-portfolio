import { localeString, localeText, localeRichText, localeSlug } from "./locale";
import { richText } from "./objects/richText";
import { siteImage } from "./objects/siteImage";
import { videoEmbed } from "./objects/videoEmbed";
import { seo } from "./objects/seo";
import {
  heroSection,
  videoReelSection,
  featuredProjectsSection,
  classesSection,
  richTextSection,
  imageGridSection,
  contactCtaSection,
  workshopsSection,
  comingSoonSection,
  linkItem,
  navItem,
} from "./objects/sections";
import { page } from "./documents/page";
import { project } from "./documents/project";
import { classType } from "./documents/classType";
import { workshop } from "./documents/workshop";
import { navigation } from "./documents/navigation";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes = [
  // Documents
  page,
  project,
  classType,
  workshop,
  navigation,
  siteSettings,
  // Sections
  heroSection,
  videoReelSection,
  featuredProjectsSection,
  classesSection,
  richTextSection,
  imageGridSection,
  contactCtaSection,
  workshopsSection,
  comingSoonSection,
  // Shared objects
  linkItem,
  siteImage,
  videoEmbed,
  richText,
  seo,
  // Localization wrappers
  localeString,
  localeText,
  localeRichText,
  localeSlug,
];
