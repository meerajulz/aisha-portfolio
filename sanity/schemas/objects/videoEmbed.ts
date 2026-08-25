import { defineField, defineType } from "sanity";

/**
 * Vimeo is the default: YouTube routinely age-gates or removes rope work,
 * and its appeals process is not something to depend on for a booking funnel.
 * YouTube stays supported so existing links keep working.
 */
export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Vídeo",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Enlace del vídeo",
      description: "Pega la dirección de Vimeo (recomendado) o de YouTube.",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }).custom((value) => {
          if (!value) return true;
          const ok = /(vimeo\.com|youtube\.com|youtu\.be)/i.test(value);
          return ok || "Sólo se admiten enlaces de Vimeo o YouTube.";
        }),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "localeString",
    }),
    defineField({
      name: "poster",
      title: "Imagen de portada",
      description:
        "Opcional. Si la dejas vacía se usa la miniatura del vídeo. Ponla si quieres controlar qué fotograma se ve.",
      type: "siteImage",
    }),
  ],
  preview: {
    select: { title: "title.es", subtitle: "url" },
  },
});
