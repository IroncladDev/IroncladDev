import { ScrollContext } from "application/state";
import { Navbar } from "application/components";
import NextNProgress from "nextjs-progressbar";
import { Modal } from "application/components";
import type { AppProps } from "next/app";
import { View } from "application/ui";
import Styles from "lib/baseStyles";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Head from "next/head";
import "styles/globals.css";
import { useRouter } from "next/router";

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

function MetaData({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta property="og:image" content="/homepage.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="700" />
      <meta name="twitter:image" content="/homepage.png" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:site" content="@IroncladDev" />
      <meta name="twitter:creator" content="@IroncladDev" />
      <meta property="og:type" content="website" />
      <meta name="copyright" content="2023" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/brand/favicon.svg" />
    </>
  );
}

function AppContainer({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useRouter();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname, scrollRef]);

  return (
    <>
      <Head>
        <MetaData
          title="Ironclad Web Development"
          description="Conner Ow (IroncladDev) is a Fullstack Developer who lives out in the country. He enjoys building with AI, Content Creation, and Brazillian Jiu-Jitsu."
        />
      </Head>
      <NextNProgress
        options={{ showSpinner: false }}
        color="var(--accent-primary-default)"
      />
      <ScrollContext.Provider value={scrollRef}>
        <div className="root">
          <View css={Styles.Container}>
            <Navbar />
            <View css={Styles.BodyContainer} innerRef={scrollRef}>
              <Component {...pageProps} />
            </View>
          </View>
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
      </ScrollContext.Provider>
    </>
  );
}

export default AppContainer;
