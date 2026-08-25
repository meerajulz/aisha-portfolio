import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Buscadores y redes",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Título en Google",
      description: "Si lo dejas vacío se usa el título de la página.",
      type: "localeString",
    }),
    defineField({
      name: "metaDescription",
      title: "Descripción en Google",
      description: "Unas dos líneas. Es lo que se lee debajo del título en los resultados de búsqueda.",
      type: "localeText",
    }),
    defineField({
      name: "shareImage",
      title: "Imagen al compartir",
      description: "La imagen que aparece cuando alguien comparte el enlace por WhatsApp o redes.",
      type: "image",
    }),
    defineField({
      name: "noIndex",
      title: "Ocultar de Google",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
