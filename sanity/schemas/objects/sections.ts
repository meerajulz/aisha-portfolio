import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The page builder.
 *
 * A page is an ordered list of these blocks. The editor adds, reorders and
 * removes them by dragging. This is what makes the home page genuinely
 * editable rather than "editable if you call the developer" — and it means
 * the home page is not a special case in the codebase.
 *
 * Adding a new block later = one schema here + one component in
 * src/components/sections. Nothing else changes.
 */

export const heroSection = defineType({
  name: "heroSection",
  title: "Portada",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "standfirst", title: "Frase de entrada", type: "localeText" }),
    defineField({
      name: "media",
      title: "Imagen o vídeo de fondo",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Imagen", type: "siteImage" }),
        defineField({ name: "video", title: "Vídeo", type: "videoEmbed" }),
      ],
    }),
    defineField({ name: "cta", title: "Botón", type: "linkItem" }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Portada", subtitle: "Portada" }) },
});

export const videoReelSection = defineType({
  name: "videoReelSection",
  title: "Vídeos",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({
      name: "videos",
      title: "Vídeos",
      type: "array",
      of: [defineArrayMember({ type: "videoEmbed" })],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "heading.es", videos: "videos" }, prepare: ({ title, videos }) => ({ title: title || "Vídeos", subtitle: `${videos?.length ?? 0} vídeo(s)` }) },
});

export const featuredProjectsSection = defineType({
  name: "featuredProjectsSection",
  title: "Trabajos destacados",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({
      name: "projects",
      title: "Trabajos",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Trabajos destacados", subtitle: "Trabajos destacados" }) },
});

export const classesSection = defineType({
  name: "classesSection",
  title: "Clases",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "intro", title: "Introducción", type: "localeText" }),
    defineField({
      name: "mode",
      title: "Qué clases mostrar",
      type: "string",
      options: {
        list: [
          { title: "Todas las clases activas", value: "all" },
          { title: "Sólo las que yo elija", value: "selected" },
        ],
        layout: "radio",
      },
      initialValue: "all",
    }),
    defineField({
      name: "classes",
      title: "Clases",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "class" }] })],
      hidden: ({ parent }) => parent?.mode !== "selected",
    }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Clases", subtitle: "Clases" }) },
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Texto",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "body", title: "Contenido", type: "localeRichText" }),
    defineField({
      name: "width",
      title: "Ancho",
      type: "string",
      options: {
        list: [
          { title: "Estrecho (más fácil de leer)", value: "narrow" },
          { title: "Ancho", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "narrow",
    }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Texto", subtitle: "Texto" }) },
});

export const imageGridSection = defineType({
  name: "imageGridSection",
  title: "Galería de imágenes",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [defineArrayMember({ type: "siteImage" })],
      options: { layout: "grid" },
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "heading.es", images: "images" }, prepare: ({ title, images }) => ({ title: title || "Galería", subtitle: `${images?.length ?? 0} imagen(es)` }) },
});

export const contactCtaSection = defineType({
  name: "contactCtaSection",
  title: "Formulario de contacto",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "intro", title: "Introducción", type: "localeText" }),
    defineField({
      name: "showClassPicker",
      title: "Incluir selector de clase",
      description:
        "Añade un desplegable con tus clases activas para que la persona indique cuál le interesa.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "confirmation", title: "Mensaje de confirmación", type: "localeText" }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Contacto", subtitle: "Formulario de contacto" }) },
});

export const workshopsSection = defineType({
  name: "workshopsSection",
  title: "Workshops",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "intro", title: "Introducción", type: "localeText" }),
    defineField({
      name: "show",
      title: "Qué mostrar",
      type: "string",
      options: {
        list: [
          { title: "Próximos", value: "upcoming" },
          { title: "Pasados", value: "past" },
          { title: "Próximos y pasados", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
    }),
    defineField({
      name: "emptyMessage",
      title: "Texto si no hay nada programado",
      description: "Se muestra cuando no hay workshops próximos. Por ejemplo: «Ahora mismo no hay fechas. Escríbeme si te interesa.»",
      type: "localeText",
    }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Workshops", subtitle: "Workshops" }) },
});

export const comingSoonSection = defineType({
  name: "comingSoonSection",
  title: "Próximamente",
  type: "object",
  description: "Una página en construcción, con un aviso y un enlace opcional.",
  fields: [
    defineField({ name: "heading", title: "Título", type: "localeString" }),
    defineField({ name: "body", title: "Texto", type: "localeText" }),
    defineField({ name: "cta", title: "Botón", type: "linkItem" }),
  ],
  preview: { select: { title: "heading.es" }, prepare: ({ title }) => ({ title: title || "Próximamente", subtitle: "Próximamente" }) },
});

export const linkItem = defineType({
  name: "linkItem",
  title: "Enlace",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texto del enlace", type: "localeString" }),
    defineField({
      name: "kind",
      title: "Destino",
      type: "string",
      options: {
        list: [
          { title: "Una página de la web", value: "internal" },
          { title: "Una dirección externa", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "page",
      title: "Página",
      type: "reference",
      to: [{ type: "page" }, { type: "project" }],
      hidden: ({ parent }) => parent?.kind !== "internal",
    }),
    defineField({
      name: "href",
      title: "Dirección web",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
  ],
  preview: { select: { title: "label.es" } },
});

/**
 * A top-level header entry: behaves like a linkItem (so it can point somewhere
 * on its own) but may also carry a submenu of linkItems. Used only in the main
 * navigation — CTAs and the footer stay flat.
 */
export const navItem = defineType({
  name: "navItem",
  title: "Elemento del menú",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texto del enlace", type: "localeString" }),
    defineField({
      name: "kind",
      title: "Destino",
      type: "string",
      options: {
        list: [
          { title: "Una página de la web", value: "internal" },
          { title: "Una dirección externa", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "page",
      title: "Página",
      type: "reference",
      to: [{ type: "page" }, { type: "project" }],
      hidden: ({ parent }) => parent?.kind !== "internal",
    }),
    defineField({
      name: "href",
      title: "Dirección web",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
    defineField({
      name: "children",
      title: "Submenú",
      description: "Opcional. Enlaces que aparecen al pasar el cursor sobre este elemento.",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
    }),
  ],
  preview: {
    select: { title: "label.es", children: "children" },
    prepare: ({ title, children }) => ({
      title: title || "Elemento del menú",
      subtitle: children?.length ? `${children.length} en submenú` : undefined,
    }),
  },
});

/** The union used by page.sections[] — the single list to extend. */
export const SECTION_TYPES = [
  "heroSection",
  "videoReelSection",
  "featuredProjectsSection",
  "classesSection",
  "richTextSection",
  "imageGridSection",
  "workshopsSection",
  "comingSoonSection",
  "contactCtaSection",
] as const;
