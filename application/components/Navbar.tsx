import useScroll from "application/hooks/useScroll";
import { View, rcss, tokens, FlexSpacer, FlexRow } from "application/ui";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { css } from "@emotion/react";

const Styles = {
  NavContainer: css([
    rcss.p(16),
    rcss.pr(24),
    rcss.handleMaxWidth(512, {
      padding: 8,
    }),
    {
      width: "100vw",
      transition: "0.25s",
      position: "relative",
      zIndex: 20,
    },
  ]),
  NavInner: css([
    rcss.flex.row,
    rcss.flex.grow(2),
    rcss.rowWithGap(8),
    rcss.align.center,
    {
      width: "100%",
      maxWidth: tokens.maxBodyWidth,
      margin: "0 auto",
    },
  ]),
};

const NavLink = ({ text, href }: { text: ReactNode; href: string }) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        css={[
          rcss.handleMaxWidth(512, {
            fontSize: tokens.fontSizeSmall,
          }),
          {
            textDecoration: "none",
          },
        ]}
      >
        {text}
      </a>
    </Link>
  );
};

export const Navbar = ({ scrollRef }) => {
  const { scrollTop, percentage, initialHeight } = useScroll(scrollRef);

  return (
    <>
      <View
        css={Styles.NavContainer}
        style={{
          background: `linear-gradient(
          135deg,
          ${tokens.backgroundRoot} 0%,
          ${tokens.backgroundDefault} ${percentage * 100}%,
          ${tokens.backgroundRoot} ${percentage * 100}%,
          ${tokens.backgroundDefault} 100%
        )`,
        }}
      >
        <View css={Styles.NavInner}>
          <Link href="/" legacyBehavior>
            <a>
              <FlexRow gap={8} center>
                <Image
                  src="/brand/logo-white-transparent.svg"
                  alt="IroncladDev Logo"
                  width="32"
                  height="32"
                />

                <Image
                  src="/brand/headline.svg"
                  alt="Headline"
                  height="24"
                  width={8 * 15}
                />
              </FlexRow>
            </a>
          </Link>
          <FlexSpacer />
          <View css={[rcss.flex.row, rcss.align.center, rcss.rowWithGap(16)]}>
            <NavLink href="/about" text="About" />
            <NavLink href="/showcase" text="Showcase" />
            <NavLink href="/blog" text="Blog" />
            <NavLink href="/contact" text="Contact" />
          </View>
        </View>
        <div
          style={{
            content: '""',
            position: "absolute",
            top: "100%",
            right: 0,
            width: scrollTop >= initialHeight ? "100%" : "0%",
            height: 2,
            background: tokens.linearDefault,
            transition: "0.25s",
          }}
        />
      </View>
    </>
  );
};
