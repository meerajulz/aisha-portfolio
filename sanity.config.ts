import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "default",
  title: "Web",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      /**
       * Custom structure so the editor sees Páginas / Trabajos / Clases /
       * Menú / Ajustes rather than a flat list of document types, and so the
       * two singletons can't be duplicated.
       */
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.documentTypeListItem("page").title("Páginas"),
            S.documentTypeListItem("project").title("Trabajos"),
            S.documentTypeListItem("class").title("Clases"),
            S.documentTypeListItem("workshop").title("Workshops"),
            S.divider(),
            S.listItem()
              .title("Menú")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Ajustes")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
    visionTool(),
  ],
  document: {
    // Hide singletons from the "create new" menu.
    newDocumentOptions: (prev) =>
      prev.filter((t) => !["navigation", "siteSettings"].includes(t.templateId)),
  },
});
