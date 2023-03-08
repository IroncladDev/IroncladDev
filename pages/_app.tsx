import "styles/globals.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Modal } from "application/components";
import { SessionProvider } from "next-auth/react";

interface AnimatedCursorOptions {
  innerSize: number;
  outerSize: number;
  color: string;
  innerScale: number;
  outerScale: number;
  trailingSpeed: number;
}

const AnimatedCursor = dynamic<AnimatedCursorOptions>(
  () => import("react-animated-cursor"),
  {
    ssr: false,
  }
);

function AppContainer({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>IroncladDev</title>
        <link rel="icon" href="/brand/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ironclad Web Development" />
        <meta
          property="og:description"
          content="Conner Ow is a Fullstack Web Developer who lives out in the country.  He is currently doing Support Engineering at Replit."
        />
        <meta
          name="description"
          content="Conner Ow is a Fullstack Web Developer who lives out in the country.  He is currently doing Support Engineering at Replit."
        />
        <meta property="og:image" content="/homepage.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="700" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="copyright" content="2023" />
      </Head>
      <NextNProgress
        options={{ showSpinner: false }}
        color="var(--accent-primary-default)"
      />
      <div className="root">
        <Component {...pageProps} />
        <Modal />
        <AnimatedCursor
          innerSize={8}
          outerSize={16}
          color="191, 210, 231"
          innerScale={0.75}
          outerScale={2}
          trailingSpeed={4}
        />
      </div>
    </SessionProvider>
  );
}

export default AppContainer;
