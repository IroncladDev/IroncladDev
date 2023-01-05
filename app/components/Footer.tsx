import { View, tokens, rcss, FlexRow, Text, FlexSpacer, FlexCol } from "app/ui";
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";

const Styles = {
  Container: css([
    rcss.px(16),
    rcss.py(32),
    rcss.linearGradient(-45, [
      tokens.backgroundDefault,
      tokens.subgroundDefault,
    ]),
    rcss.flex.column,
    rcss.colWithGap(16),
    rcss.align.center,
    {
      borderTop: `solid 2px ${tokens.linearDefault}`,
    },
  ]),

  InnerFlex: css([
    rcss.flex.row,
    rcss.rowWithGap(8),
    {
      maxWidth: tokens.maxBodyWidth,
      width: "100%",
    },
  ]),

  Links: css([
    rcss.flex.row,
    rcss.flex.grow(1),
    {
      "& div": {
        flexGrow: 1,
        "& a": {
          alignSelf: "center",
          justifySelf: "center",
        },
      },
    },
  ]),

  Foot: css([
    rcss.p(8),
    {
      borderTop: `solid 1px ${tokens.subgroundHighest}`,
      maxWidth: tokens.maxBodyWidth,
      width: "100%",
    },
  ]),
};

export default function Footer() {
  return (
    <View css={Styles.Container}>
      <View css={Styles.InnerFlex}>
        <View>
          <Link href="/" passHref>
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
        </View>
        <View css={Styles.Links}>
          <div />
          <FlexCol gap={16}>
            <Link href="/" passHref>
              <a>
                <Text>Home</Text>
              </a>
            </Link>
            <Link href="/about" passHref>
              <a>
                <Text>About</Text>
              </a>
            </Link>
          </FlexCol>
          <FlexCol gap={16}>
            <Link href="/work" passHref>
              <a>
                <Text>Work</Text>
              </a>
            </Link>
            <Link href="/contact" passHref>
              <a>
                <Text>Contact</Text>
              </a>
            </Link>
          </FlexCol>
          <FlexCol gap={16}>
            <Link href="/blog" passHref>
              <a>
                <Text>Blog</Text>
              </a>
            </Link>
            <a href="https://discord.com/invite/kuGvdgn5SK" target="_blank">
              <Text>Discord</Text>
            </a>
          </FlexCol>
        </View>
      </View>
      <View css={Styles.Foot}>
        <Text color="dimmer">
          &copy; Conner Ow {new Date().getFullYear() === 2023 ? "" : "2023 - "}
          {new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
}
