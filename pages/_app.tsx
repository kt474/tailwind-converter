import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import Head from "next/head";

if (typeof window !== "undefined") {
  //@ts-ignore check that we are client side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "always",
    persistence: "localStorage",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    }
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Tailwind Converter</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta
          name="description"
          content="Convert plain HTML and CSS into a single file with Tailwind CSS"
        />
        <meta name="keywords" content="tailwind, css, html, convert" />
      </Head>
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
      <Analytics />
    </div>
  );
}

export default MyApp;
