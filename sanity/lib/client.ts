import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN lags publishes by up to ~60s; skip it in dev so edits show at once.
  useCdn: !isDev,
  perspective: "published",
});

/**
 * Production: cache indefinitely and let the publish webhook invalidate by tag,
 * so edits go live in seconds without rebuilding.
 * Development: no cache — every request pulls live from Sanity, so publishing
 * in Studio shows on localhost on the next refresh (the webhook isn't running).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: isDev ? { revalidate: 0 } : { revalidate: false, tags },
  });
}
