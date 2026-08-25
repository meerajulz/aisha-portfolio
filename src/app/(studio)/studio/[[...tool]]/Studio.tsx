"use client";

import dynamic from "next/dynamic";

/**
 * ssr: false keeps the Studio — and everything sanity.config drags in — off
 * the server entirely. It's an editor UI behind a login; there's nothing to
 * server-render or index, and server-rendering it crashes the build.
 */
const StudioInner = dynamic(() => import("./StudioInner"), {
  ssr: false,
});

export function Studio() {
  return <StudioInner />;
}
