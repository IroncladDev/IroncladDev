import {
  View,
  Text,
  tokens,
  rcss,
  FlexSpacer,
  IconButton,
} from "application/ui";
import { useSpring, useTransform } from "framer-motion";
import { useScrollControl } from "application/hooks/useScroll";
import { SocialDescription } from "public/content/misc";
import Styles from "lib/baseStyles";
import {
  Section,
  Markdown,
  Footer,
  Slant,
  Modal,
} from "application/components";
import { SocialPlatform } from "public/content/types";
import { ContactHeaderDraw } from "application/components/ContactHeaderDraw";
import QRCode from "react-qr-code";
import { useState } from "react";
import { LightningAddress } from "alby-tools";
import type { WebLNProvider } from "webln";
import { CopyButton } from "./tokens";
import { X } from "react-feather";

declare global {
  interface Window {
    webln?: WebLNProvider;
  }
}

const LightningModal = ({
  invoice,
  isOpen,
  close,
}: {
  invoice: string;
  isOpen: boolean;
  close: () => void;
}) => {
  return (
    <Modal isVisible={isOpen} onClose={close}>
      <View
        css={[
          rcss.flex.column,
          rcss.colWithGap(16),
          {
            background: tokens.backgroundDefault,
            border: `solid 1px ${tokens.backgroundHigher}`,
          },
          rcss.p(16),
          rcss.borderRadius(8),
          rcss.maxWidth(300),
          rcss.center,
        ]}
      >
        <View css={[rcss.flex.column, rcss.colWithGap(8)]}>
          <View
            css={[rcss.flex.row, rcss.justify.spaceBetween, rcss.align.center]}
          >
            <Text variant="subheadDefault">Lightning Payment</Text>

            <IconButton onClick={close}>
              <X size={16} color={tokens.foregroundDefault} />
            </IconButton>
          </View>

          <Text multiline color="dimmer">
            Scan the QR code or paste the lightning payment request to tip me
            ~$5 in bitcoin
          </Text>

          <View css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}>
            <CopyButton text={invoice} />
            <Text>Copy</Text>
          </View>
        </View>

        <View css={[rcss.minWidth(200), rcss.minHeight(200)]}>
          <QRCode
            value={invoice}
            size={200}
            bgColor={tokens.backgroundDefault}
            fgColor={tokens.foregroundDimmer}
          />
        </View>
      </View>
    </Modal>
  );
};

export default function About() {
  const { initialHeight, scrollTop, scrollRef } = useScrollControl();

  const [lightningModal, setLightningModal] = useState(false);
  const [invoice, setInvoice] = useState<string | null>(null);

  const scrollSpring = useSpring(scrollTop, {
    mass: 0.05,
  });

  const background = useTransform(
    scrollSpring,
    (scroll) => `linear-gradient(${
      135 + (scroll / initialHeight) * (180 - 135)
    }deg, 
      ${tokens.backgroundRoot} 0%,
      ${tokens.subgroundDefault} 50%,  
      ${tokens.subgroundRoot} 50%,
      ${tokens.backgroundDefault} 100%
    )`
  );

  const handleLightning = async () => {
    const ln = new LightningAddress("ironclad@getalby.com");
    await ln.fetch();

    const invoice = await ln.requestInvoice({ satoshi: 20000 });

    if (typeof window.webln !== "undefined") {
      await window.webln.enable();
      await window.webln.sendPayment(invoice.paymentRequest);
    } else {
      setLightningModal(true);
      setInvoice(invoice.paymentRequest);
    }

    const payCheckInterval = setInterval(() => {
      invoice.isPaid().then((paid) => {
        if (paid) {
          setInvoice(null);
          setLightningModal(false);
          alert("Thanks for the tip!");
          clearInterval(payCheckInterval);
        }
      });
    }, 1000);
  };

  return (
    <>
      {/* Header Section */}
      <View
        css={[rcss.center, rcss.flex.column]}
        style={{
          minHeight: initialHeight,
          background,
        }}
      >
        <View css={Styles.HeaderContentContainer}>
          <View css={Styles.HeaderContentText}>
            <View css={Styles.HeaderContents}>
              <h1 css={Styles.HeaderTitleSecondary}>Get in touch</h1>
              <h2
                css={{
                  fontSize: tokens.fontSizeSubheadDefault,
                  fontFamily: "var(--font-family-ui)",
                  margin: 0,
                  lineHeight: 1.1,
                  color: tokens.foregroundDimmest,
                }}
              >
                (Not a hugger btw)
              </h2>
            </View>
            <Text multiline color="dimmer">
              <Markdown markdown="I'm always open to fellow developers and technology enthusiasts." />
            </Text>

            <Text multiline color="dimmer">
              <Markdown markdown="Say Hi and pitch me what you're building!" />
            </Text>

            <FlexSpacer />

            <View css={[rcss.flex.row, rcss.justify.center]}>
              <button
                css={Styles.DownButton}
                onClick={() => {
                  scrollRef.current?.scrollBy(0, window.innerHeight);
                }}
                aria-label="scroll down"
              />
            </View>
          </View>
          <ContactHeaderDraw />
        </View>
        <Slant
          path="polygon(100% 0, 0% 100%, 100% 100%)"
          background={tokens.backgroundRoot}
          borderTop
        />
      </View>

      {/* About */}
      <Section
        css={[rcss.flex.column, rcss.colWithGap(32), rcss.center]}
        background={tokens.backgroundRoot}
      >
        <Text variant="headerDefault">Contact Me</Text>

        <View
          css={[
            rcss.flex.wrap,
            rcss.flex.row,
            rcss.p(16),
            rcss.justify.center,
            rcss.width("100%"),
            rcss.maxWidth(tokens.maxBodyWidth),
          ]}
        >
          {Object.values(SocialPlatform).map((key, i) => (
            <ContactCard key={i} platform={key} />
          ))}
        </View>
      </Section>

      <Section
        css={[rcss.flex.column, rcss.center, rcss.colWithGap(32)]}
        background={tokens.backgroundDefault}
        head={
          <Slant
            path="polygon(100% 0, 100% 100%, 0 0)"
            background={tokens.backgroundRoot}
          />
        }
      >
        <Text variant="headerDefault">Support Me</Text>

        <View
          css={[
            rcss.flex.row,
            rcss.flex.wrap,
            rcss.width("100%"),
            rcss.center,
            {
              gap: 16,
            },
          ]}
        >
          <View
            css={[rcss.flex.column, rcss.colWithGap(8), rcss.center]}
            onClick={handleLightning}
          >
            <View
              css={[
                rcss.p(16),
                rcss.borderRadius(8),
                {
                  border: `solid 1px ${tokens.backgroundHighest}`,
                  transition: "0.25s",
                  cursor: "pointer",
                  "&:hover": {
                    background: tokens.backgroundHigher,
                  },
                },
              ]}
            >
              <img
                src="/icons/lightning.svg"
                width={64}
                height={64}
                alt="Lightning Network"
              />
            </View>
            <Text>Lightning</Text>
          </View>

          <a
            href="https://ko-fi.com/ironcladdev"
            target="_blank"
            rel="noreferrer"
            css={{
              textDecoration: "none",
              "& *": {
                textDecoration: "none !important",
              },
            }}
          >
            <View css={[rcss.flex.column, rcss.colWithGap(8), rcss.center]}>
              <View
                css={[
                  rcss.p(16),
                  rcss.borderRadius(8),
                  {
                    border: `solid 1px ${tokens.backgroundHighest}`,
                    transition: "0.25s",
                    cursor: "pointer",
                    "&:hover": {
                      background: tokens.backgroundHigher,
                    },
                  },
                ]}
              >
                <img
                  src="/icons/java.svg"
                  width={64}
                  height={64}
                  alt="Ko-fi... ...or not?"
                />
              </View>
              <Text>Buy me a Coffee</Text>
            </View>
          </a>
        </View>
      </Section>

      <Section
        css={[
          rcss.flex.column,
          rcss.center,
          rcss.colWithGap(32),
          rcss.p(16),
          rcss.minHeight("100vh"),
        ]}
        background={tokens.backgroundRoot}
        head={
          <Slant
            path="polygon(100% 0, 100% 100%, 0 0)"
            background={tokens.backgroundDefault}
          />
        }
      >
        <Text variant="headerDefault">Fight Me</Text>
        <View
          css={[
            rcss.flex.row,
            rcss.align.center,
            rcss.maxWidth(700),
            rcss.width("100%"),
            rcss.handleMaxWidth(480, {
              flexDirection: "column",
            }),
            {
              gap: 32,
            },
          ]}
        >
          <img
            width={200}
            height={200}
            src="/icons/bjj.svg"
            alt="RM Elite Logo"
          />

          <Text multiline color="dimmer">
            <Markdown
              markdown={`Mad at me for some reason, or just want to roll and have some fun?  Meet me at [RM Elite BJJ](https://rmelitebjj.com) and I'd be happy to do a round of Brazillian Jiu-Jitsu with you.\n\nSend me a DM through one of the contact options above regarding the date and I'll meet you there.`}
            />
          </Text>
        </View>
      </Section>

      <Footer />

      {invoice && lightningModal ? (
        <LightningModal
          isOpen={lightningModal}
          close={() => setLightningModal(false)}
          invoice={invoice}
        />
      ) : null}
    </>
  );
}

function ContactCard({ platform }: { platform: SocialPlatform }) {
  const { url, icon, title, handle, description } = SocialDescription[platform];

  return (
    <View
      css={[
        {
          border: `solid 1px ${tokens.backgroundHigher}`,
          transition: "0.25s",
          "&:hover": {
            backgroundColor: tokens.backgroundDefault,
            borderColor: tokens.backgroundHighest,
          },
        },
        rcss.width("calc(100% / 3)"),
        rcss.minWidth(320),
      ]}
    >
      <a
        href={url}
        rel="noreferrer"
        css={[
          rcss.flex.column,
          rcss.colWithGap(24),
          rcss.p(24),
          rcss.flex.grow(1),
          {
            textDecoration: "none",
            "& *": {
              textDecoration: "none !important",
            },
          },
        ]}
        target="_blank"
      >
        <View css={[rcss.flex.row, rcss.rowWithGap(16), rcss.align.center]}>
          <View
            css={[
              rcss.p(8),
              rcss.borderRadius(8),
              {
                background: tokens.backgroundHigher,
                border: `solid 1px ${tokens.backgroundHighest}`,
              },
            ]}
          >
            <img src={icon} alt="Icon" width={32} height={32} />
          </View>

          <View css={[rcss.flex.column, rcss.colWithGap(8)]}>
            <Text variant="subheadDefault">{title}</Text>
            <Text color="dimmest">{handle}</Text>
          </View>
        </View>

        <Text multiline color="dimmer">
          <Markdown markdown={description} />
        </Text>
      </a>
    </View>
  );
}
