/**
 * The Studio lives inside this app at /studio.
 * One repo, one deploy, one place to log in.
 *
 * This server component only renders a client boundary. The actual Studio
 * (and sanity.config, which imports client-only UI that calls createContext
 * at import time) is loaded via a client-only dynamic import in Studio.tsx,
 * so none of it is evaluated on the server during the build.
 */
import { Studio } from "./Studio";

export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
