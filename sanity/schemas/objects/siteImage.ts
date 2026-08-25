import { defineField, defineType } from "sanity";

/**
 * Every image on the site goes through here.
 *
 * hotspot lets the editor mark the important part of the photo, so every
 * crop across the site keeps that point centred.
 *
 * consentOnFile is a deliberate speed bump: photographs of identifiable
 * people are personal data under GDPR, and in a year there will be hundreds
 * of images with no memory of which session had a signed release.
 */
export const siteImage = defineType({
  name: "siteImage",
  title: "Imagen",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texto alternativo",
      description:
        "Describe la imagen para personas que usan lectores de pantalla y para Google.",
      type: "localeString",
    }),
    defineField({
      name: "credit",
      title: "Fotografía de",
      type: "string",
    }),
    defineField({
      name: "showsPeople",
      title: "Aparecen personas identificables",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "consentOnFile",
      title: "Tengo consentimiento firmado",
      description:
        "Obligatorio si aparecen personas identificables. Guarda el documento firmado fuera de la web.",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.showsPeople,
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { showsPeople?: boolean } | undefined;
          if (parent?.showsPeople && !value) {
            return "No se puede publicar una foto de una persona identificable sin consentimiento.";
          }
          return true;
        }),
    }),
  ],
});
