import { defineArrayMember, defineField, defineType } from "sanity";
import { SECTION_TYPES } from "../objects/sections";

export const page = defineType({
  name: "page",
  title: "Páginas",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Dirección", type: "localeSlug", validation: (r) => r.required() }),
    defineField({
      name: "isHome",
      title: "Es la página de inicio",
      description: "Marca sólo una página. Se mostrará en la dirección principal de la web.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sections",
      title: "Secciones",
      description: "Añade bloques y arrástralos para cambiar el orden.",
      type: "array",
      of: SECTION_TYPES.map((type) => defineArrayMember({ type })),
    }),
    defineField({ name: "seo", title: "Buscadores y redes", type: "seo" }),
  ],
  preview: {
    select: { title: "title.es", isHome: "isHome", slug: "slug.es.current" },
    prepare: ({ title, isHome, slug }) => ({
      title: title || "Sin título",
      subtitle: isHome ? "Página de inicio" : slug ? `/${slug}` : "Sin dirección",
    }),
  },
});
