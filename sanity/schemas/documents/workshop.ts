import { defineField, defineType } from "sanity";

/**
 * A workshop is a dated event, which makes it a different thing from a class.
 *
 * A `class` is something she offers continuously — it belongs in the contact
 * dropdown and doesn't expire. A `workshop` happens once, on a date, in a
 * place, and needs to move itself into "past" afterwards without her
 * remembering to do it. Same reason a blog post isn't a page.
 */
export const workshop = defineType({
  name: "workshop",
  title: "Workshops",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "startDate",
      title: "Fecha",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "Fecha de fin",
      description: "Sólo si dura más de un día.",
      type: "datetime",
    }),
    defineField({ name: "city", title: "Ciudad", type: "string" }),
    defineField({ name: "venue", title: "Lugar", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "localeText" }),
    defineField({ name: "image", title: "Imagen", type: "siteImage" }),
    defineField({ name: "price", title: "Precio", type: "localeString" }),
    defineField({
      name: "bookingUrl",
      title: "Enlace de inscripción",
      description: "Si las inscripciones se hacen en otra web. Si lo dejas vacío se usa tu formulario de contacto.",
      type: "url",
    }),
    defineField({
      name: "soldOut",
      title: "Plazas agotadas",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Fecha, más próxima primero", name: "dateAsc", by: [{ field: "startDate", direction: "asc" }] }],
  preview: {
    select: { title: "title.es", date: "startDate", city: "city", media: "image" },
    prepare: ({ title, date, city, media }) => ({
      title: title || "Sin título",
      subtitle: [date ? new Date(date).toLocaleDateString("es-ES") : null, city].filter(Boolean).join(" · "),
      media,
    }),
  },
});
