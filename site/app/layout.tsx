import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { site, getWhatsAppHref, canonical } from "@/lib/site";

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
  alternates: {
    canonical: canonical("/"),
  },
  keywords: [
    // Role titles recruiters actually search
    "Full-Stack AI Engineer",
    "AI Full-Stack Engineer",
    "AI Software Engineer",
    "AI Engineer",
    "Generative AI Engineer",
    "GenAI Engineer",
    "LLM Engineer",
    "RAG Engineer",
    "AI Application Engineer",
    "AI Product Engineer",
    "Machine Learning Engineer",
    "ML Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Remote AI Engineer",
    // Stack and skills (all shipped in production)
    "LLM",
    "Large Language Models",
    "RAG",
    "Agentic RAG",
    "AI Agents",
    "LangChain",
    "LLM Fine-tuning",
    "Prompt Engineering",
    "LLM Evaluation",
    "Vector Database",
    "pgvector",
    "Semantic Search",
    "FastAPI",
    "Python",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "OpenAI API",
    "Docker",
    "GCP",
    "AWS",
    "Cloud Run",
    "CI/CD",
    "Generative AI",
    // Identity and location
    "Birehan Zewdie",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
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

const personId = `${site.url}/#person`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: `${site.url}${site.image}`,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  description: site.longDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  homeLocation: {
    "@type": "Place",
    name: `${site.location.city}, ${site.location.country}`,
  },
  nationality: {
    "@type": "Country",
    name: site.location.country,
  },
  knowsLanguage: ["English", "Amharic"],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Addis Ababa University",
    },
    {
      "@type": "EducationalOrganization",
      name: "10 Academy",
    },
    {
      "@type": "EducationalOrganization",
      name: "A2SV (Africa to Silicon Valley)",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "The COOL Company",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack AI Engineer",
    occupationalCategory: "15-1252.00 Software Developers",
    skills:
      "LLMs, Retrieval-Augmented Generation, AI Agents, LangChain, FastAPI, Python, Next.js, React, TypeScript, PostgreSQL, pgvector, Prompt Engineering, LLM Evaluation, MLOps",
  },
  mainEntityOfPage: canonical("/about"),
  sameAs: [
    site.social.github,
    site.social.linkedin,
    site.social.upwork,
    site.social.medium,
    getWhatsAppHref(),
  ].filter(Boolean),
  knowsAbout: [
    "Full-Stack AI Engineering",
    "AI Engineering",
    "Software Engineering",
    "Machine Learning",
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Agentic RAG",
    "AI Agents",
    "LangChain",
    "LLM Fine-tuning",
    "Prompt Engineering",
    "LLM Evaluation",
    "Vector Databases",
    "Semantic Search",
    "FastAPI",
    "Python",
    "TypeScript",
    "Next.js",
    "React",
    "PostgreSQL",
    "pgvector",
    "Docker",
    "Cloud Run",
    "CI/CD",
    "MLOps",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — ${site.role}`,
  description: site.tagline,
  inLanguage: "en",
  publisher: { "@id": personId },
  author: { "@id": personId },
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
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
