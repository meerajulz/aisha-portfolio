import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Respects the hotspot the editor set, so crops never cut off the subject. */
export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("crop").crop("focalpoint");
}
