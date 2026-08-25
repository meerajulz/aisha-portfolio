import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { sanityFetch } from "@sanity-cfg/lib/client";
import { navigationQuery, siteSettingsQuery } from "@sanity-cfg/lib/queries";
import { localize } from "@sanity-cfg/lib/localize";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { LOCALES, LOCALE_TAGS, isActiveLocale, type Locale } from "@/lib/i18n";
import "../globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});
const body = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale)) return {};

  const settings = await sanityFetch<any>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  return {
    title: {
      default: settings?.siteName ?? "",
      template: `%s · ${settings?.siteName ?? ""}`,
    },
    description: localize<string>(settings?.defaultSeo?.metaDescription, locale as Locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();

  const [nav, settings] = await Promise.all([
    sanityFetch<any>({ query: navigationQuery, tags: ["navigation"] }),
    sanityFetch<any>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);

  return (
    <html lang={LOCALE_TAGS[locale]} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {settings?.contentNotice?.enabled && (
          <ContentNotice
            body={localize<string>(settings.contentNotice.body, locale)}
            acceptLabel={localize<string>(settings.contentNotice.acceptLabel, locale)}
          />
        )}
        <Header nav={nav} siteName={settings?.siteName} locale={locale} />
        <main>{children}</main>
        <Footer nav={nav} settings={settings} locale={locale} />
      </body>
    </html>
  );
}
