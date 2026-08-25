import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Nombre del sitio", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Descripción corta", type: "localeString" }),
    defineField({ name: "logo", title: "Logotipo", type: "image" }),
    defineField({ name: "defaultSeo", title: "Buscadores y redes (por defecto)", type: "seo" }),
    defineField({
      name: "social",
      title: "Redes sociales",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Red", type: "string" }),
            defineField({ name: "url", title: "Dirección", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "contentNotice",
      title: "Aviso al entrar",
      type: "object",
      description:
        "Aviso breve que se muestra la primera vez que alguien visita la web. Se recuerda en el navegador de la persona.",
      fields: [
        defineField({ name: "enabled", title: "Mostrar aviso", type: "boolean", initialValue: false }),
        defineField({ name: "body", title: "Texto", type: "localeText" }),
        defineField({ name: "acceptLabel", title: "Texto del botón", type: "localeString" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Ajustes" }) },
});
