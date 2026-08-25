/**
 * The Studio has its own root shell, separate from the site's.
 * It lives outside [locale] — no i18n, no site chrome, no globals.css —
 * so it renders its own <html>/<body> rather than borrowing the site's.
 */
export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
