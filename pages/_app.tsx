import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

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
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
