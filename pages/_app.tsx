import { ScrollContext } from "application/state";
import { Gallery, Navbar } from "application/components";
import NextNProgress from "nextjs-progressbar";
import { Modal } from "application/components";
import type { AppProps } from "next/app";
import { View } from "application/ui";
import Styles from "lib/baseStyles";
import { useEffect, useRef } from "react";
import Head from "next/head";
import "styles/globals.css";
import { useRouter } from "next/router";
import useGallery from "application/hooks/useGallery";

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

  const { galleryVisible, close, galleryImage, images } = useGallery();

  return (
    <>
      <Head>
        <title>Ironclad Web Development</title>
        <meta property="og:title" content="Ironclad Web Development" />
        <meta name="twitter:title" content="Ironclad Web Development" />

        <meta
          property="og:description"
          content="Conner Ow (IroncladDev) is a Fullstack Developer who lives out in the country. He enjoys building with AI, Content Creation, and Brazillian Jiu-Jitsu."
        />
        <meta
          name="description"
          content="Conner Ow (IroncladDev) is a Fullstack Developer who lives out in the country. He enjoys building with AI, Content Creation, and Brazillian Jiu-Jitsu."
        />
        <meta
          name="twitter:description"
          content="Conner Ow (IroncladDev) is a Fullstack Developer who lives out in the country. He enjoys building with AI, Content Creation, and Brazillian Jiu-Jitsu."
        />

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
          <Modal isVisible={galleryVisible} onClose={close}>
            <Gallery images={images} image={galleryImage || ""} />
          </Modal>
        </div>
      </ScrollContext.Provider>
    </>
  );
}

export default AppContainer;
