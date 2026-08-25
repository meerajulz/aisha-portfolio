import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Trabajos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Dirección", type: "localeSlug", validation: (r) => r.required() }),
    defineField({ name: "cover", title: "Imagen principal", type: "siteImage", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Año", type: "number" }),
    defineField({ name: "collaborators", title: "Con", type: "string" }),
    defineField({ name: "summary", title: "Resumen", type: "localeText" }),
    defineField({ name: "body", title: "Contenido", type: "localeRichText" }),
    defineField({
      name: "videos",
      title: "Vídeos",
      type: "array",
      of: [defineArrayMember({ type: "videoEmbed" })],
    }),
    defineField({
      name: "gallery",
      title: "Galería",
      type: "array",
      of: [defineArrayMember({ type: "siteImage" })],
      options: { layout: "grid" },
    }),
    defineField({ name: "seo", title: "Buscadores y redes", type: "seo" }),
  ],
  orderings: [{ title: "Año, más reciente primero", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: { select: { title: "title.es", subtitle: "year", media: "cover" } },
});
