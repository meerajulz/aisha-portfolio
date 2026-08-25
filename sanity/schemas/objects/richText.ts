import { defineArrayMember, defineType } from "sanity";

/**
 * Deliberately constrained toolbar.
 *
 * No font sizes, no colours, no alignment. The editor controls structure and
 * content; the design system controls how it looks. This is the difference
 * between a site that still looks good in a year and one that doesn't.
 */
export const richText = defineType({
  name: "richText",
  title: "Contenido",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Párrafo", value: "normal" },
        { title: "Título", value: "h2" },
        { title: "Subtítulo", value: "h3" },
        { title: "Cita", value: "blockquote" },
      ],
      lists: [
        { title: "Lista", value: "bullet" },
        { title: "Lista numerada", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Negrita", value: "strong" },
          { title: "Cursiva", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Enlace",
            type: "object",
            fields: [
              { name: "href", title: "Dirección web", type: "url" },
              { name: "newTab", title: "Abrir en pestaña nueva", type: "boolean" },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "siteImage" }),
  ],
});
