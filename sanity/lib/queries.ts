import { groq } from "next-sanity";

const LINK = `
  label, kind, href,
  "page": page->{ _type, "slug": slug }
`;

const IMAGE = `
  ..., alt, credit, asset->{ _id, url, metadata { lqip, dimensions } }
`;

const SECTIONS = `
  sections[]{
    _type, _key,
    _type == "heroSection" => {
      heading, standfirst,
      media { image { ${IMAGE} }, video },
      cta { ${LINK} }
    },
    _type == "videoReelSection" => {
      heading, videos[]{ url, title, poster { ${IMAGE} } }
    },
    _type == "featuredProjectsSection" => {
      heading,
      projects[]->{ _id, title, slug, year, summary, cover { ${IMAGE} } }
    },
    _type == "classesSection" => {
      heading, intro, mode,
      "classes": select(
        mode == "selected" => classes[]->{ _id, title, level, format, duration, price, description, image { ${IMAGE} } },
        *[_type == "class" && active == true] | order(order asc) {
          _id, title, level, format, duration, price, description, image { ${IMAGE} }
        }
      )
    },
    _type == "richTextSection" => { heading, body, width },
    _type == "imageGridSection" => { heading, images[]{ ${IMAGE} } },
    _type == "workshopsSection" => {
      heading, intro, show, emptyMessage,
      "upcoming": *[_type == "workshop" && startDate >= now()] | order(startDate asc) {
        _id, title, startDate, endDate, city, venue, description, price, bookingUrl, soldOut,
        image { ${IMAGE} }
      },
      "past": *[_type == "workshop" && startDate < now()] | order(startDate desc)[0...12] {
        _id, title, startDate, city, venue, image { ${IMAGE} }
      }
    },
    _type == "comingSoonSection" => { heading, body, cta { ${LINK} } },
    _type == "contactCtaSection" => {
      heading, intro, purpose, confirmation,
      "classOptions": *[_type == "class" && active == true] | order(order asc) { _id, title },
      "workshopOptions": *[_type == "workshop" && startDate >= now()] | order(startDate asc) { _id, title, startDate }
    }
  }
`;

export const homeQuery = groq`
  *[_type == "page" && isHome == true][0]{ _id, title, slug, seo, ${SECTIONS} }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug[$locale].current == $slug][0]{ _id, title, slug, seo, ${SECTIONS} }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug)]{ "slug": slug, isHome }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug[$locale].current == $slug][0]{
    _id, title, slug, year, collaborators, summary, body, seo,
    cover { ${IMAGE} },
    videos[]{ url, title, poster { ${IMAGE} } },
    gallery[]{ ${IMAGE} }
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0]{
    main[]{ ${LINK} },
    footer[]{ ${LINK} }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName, tagline, logo, defaultSeo, social,
    contentNotice { enabled, body, acceptLabel }
  }
`;
