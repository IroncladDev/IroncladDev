import "styles/globals.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic'

interface AnimatedCursorOptions {
  innerSize: number;
  outerSize: number;
  color: string;
  innerScale: number;
  outerScale: number;
}

const AnimatedCursor = dynamic<AnimatedCursorOptions>(() => import('react-animated-cursor'), {
  ssr: false
});


function AppContainer({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IroncladDev</title>
        <link rel="icon" href="/brand/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextNProgress
        options={{ showSpinner: false }}
        color="var(--accent-primary-default)"
      />
      <div className="root">
        <Component {...pageProps} />
        <AnimatedCursor 
          innerSize={8}
          outerSize={16}
          color='191, 210, 231'
          innerScale={0.75}
          outerScale={2}
        />
      </div>
    </>
  );
}

export default AppContainer;
