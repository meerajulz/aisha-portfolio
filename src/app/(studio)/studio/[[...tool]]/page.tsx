/**
 * The Studio lives inside this app at /studio.
 * One repo, one deploy, one place to log in.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
