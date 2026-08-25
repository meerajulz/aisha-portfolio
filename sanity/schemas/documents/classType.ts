import { defineField, defineType } from "sanity";

/**
 * One class, edited once, used in three places: the Classes block, the
 * contact form dropdown, and its own detail page if it has one.
 * Same principle as the page builder — one edit, no developer.
 */
export const classType = defineType({
  name: "class",
  title: "Clases",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nombre de la clase", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "level",
      title: "Nivel",
      type: "string",
      options: {
        list: [
          { title: "Iniciación", value: "beginner" },
          { title: "Intermedio", value: "intermediate" },
          { title: "Avanzado", value: "advanced" },
          { title: "Todos los niveles", value: "all" },
        ],
      },
      initialValue: "all",
    }),
    defineField({ name: "format", title: "Formato", type: "localeString", description: "Por ejemplo: taller de 3 horas, sesión individual, curso de 4 semanas." }),
    defineField({ name: "duration", title: "Duración", type: "localeString" }),
    defineField({ name: "price", title: "Precio", type: "localeString", description: "Escríbelo como quieras que se lea: «60 €», «Desde 45 € por persona»." }),
    defineField({ name: "description", title: "Descripción", type: "localeText" }),
    defineField({ name: "image", title: "Imagen", type: "siteImage" }),
    defineField({
      name: "active",
      title: "Activa",
      description: "Desactívala para retirarla de la web y del formulario sin borrarla.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "order", title: "Orden", type: "number", description: "Número más bajo aparece antes." }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.es", active: "active", level: "level", media: "image" },
    prepare: ({ title, active, level, media }) => ({
      title: title || "Sin nombre",
      subtitle: `${active ? "Activa" : "Desactivada"}${level ? ` · ${level}` : ""}`,
      media,
    }),
  },
});
