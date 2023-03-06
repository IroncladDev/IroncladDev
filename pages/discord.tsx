import { View, Text, tokens, rcss, FlexSpacer, OutlineButton } from "app/ui";
import { Navbar, Section, Footer } from "app/components";
import { useRef } from "react";
import Styles from "lib/baseStyles";
import { GithubCard, ReplitCard, DevCard, CGCard, BaseCard } from "app/components/SocialCards";
import { SocialPlatform } from "public/content/types";

export default function Discord() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        <View css={[rcss.p(16), rcss.borderRadius(8), rcss.flex.column, rcss.colWithGap(16), {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: tokens.backgroundHigher,
          border: `solid 1px ${tokens.backgroundHighest}`,
          width: 300,
          maxWidth: 300
        }]}>
          <Text variant="subheadDefault">Join my Discord Server</Text>
          <Text color="dimmer" multiline>For security purposes, you must verify your email to talk in my discord server.  Authorize with discord to continue.</Text>
        </View>
      </View>
    </View>
  );
}
