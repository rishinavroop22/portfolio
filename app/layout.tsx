import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/data/profile";

const display = localFont({
  src: "./fonts/big-shoulders-display-latin-wght-normal.woff2",
  variable: "--ff-display",
  weight: "100 900",
  display: "swap",
});

const body = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--ff-body",
  weight: "400 700",
  display: "swap",
});

const code = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--ff-code",
  weight: "100 800",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
const description =
  "Rishi Navroop, Computer Science student at JSS Science and Technology University. Java microservices with gRPC, Kafka and AWS CDK, agentic LLM systems with deterministic guardrails, and speech analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Software Developer`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  keywords: [
    "Rishi Navroop",
    "software developer",
    "backend",
    "LangGraph",
    "FastAPI",
    "machine learning",
    "JSSSTU",
  ],
  openGraph: {
    type: "website",
    title: `${profile.name} | Software Developer`,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Software Developer`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#06050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${code.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags motion before first paint so the hero intro never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
