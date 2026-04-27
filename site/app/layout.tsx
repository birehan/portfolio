import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site, getWhatsAppHref } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jbm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "LLM",
    "RAG",
    "FastAPI",
    "Next.js",
    "Birehan Zewdie",
    "Generative AI",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.tagline,
    images: ["/opengraph-image"],
    ...(site.social.twitter
      ? { site: site.social.twitter, creator: site.social.twitter }
      : {}),
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  description: site.tagline,
  sameAs: [
    site.social.github,
    site.social.linkedin,
    site.social.upwork,
    site.social.medium,
    getWhatsAppHref(),
  ].filter(Boolean),
  knowsAbout: [
    "AI Engineering",
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "FastAPI",
    "Python",
    "Next.js",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleEnabled =
    process.env.NODE_ENV === "production" && Boolean(site.plausibleDomain);

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {plausibleEnabled && (
          <Script
            defer
            data-domain={site.plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
