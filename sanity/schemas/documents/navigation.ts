import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Singleton. The editor adds a menu item here and it appears in the header —
 * no code change, no deploy.
 */
export const navigation = defineType({
  name: "navigation",
  title: "Menú",
  type: "document",
  fields: [
    defineField({
      name: "main",
      title: "Menú principal",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
    }),
    defineField({
      name: "footer",
      title: "Pie de página",
      type: "array",
      of: [defineArrayMember({ type: "linkItem" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Menú" }) },
});
