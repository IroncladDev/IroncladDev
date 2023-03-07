import { View, Text, tokens, rcss, Button } from "application/ui";
import { Navbar } from "application/components";
import { useRef } from "react";
import Styles from "lib/baseStyles";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { AuthError } from "application/types";

const errors = {
  [AuthError.Configuration]: "An internal error occurred.  Please try again.",
  [AuthError.AccessDenied]: "Access Denied.",
  [AuthError.Verification]:
    "Your Authentication Token. has expired.  Please try again.",
  [AuthError.ThreshStrike]:
    "Your discord account hit an abuse threshold.  Please try again or contact IroncladDev via email.",
  [AuthError.Exists]: "This account already exists.",
  [AuthError.CantSend]: "An internal error occurred.  Please try again.",
  [AuthError.Default]: "An internal error occurred.  Please try again.",
  [AuthError.Validity]: "Invalid email address.",
};

export default function Discord({ error }: { error: AuthError }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const verify = () => {
    signIn("discord");
  };

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        <View
          css={[
            rcss.p(16),
            rcss.borderRadius(8),
            rcss.flex.column,
            rcss.colWithGap(16),
            {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: tokens.backgroundHigher,
              border: `solid 1px ${tokens.backgroundHighest}`,
              width: 300,
              maxWidth: 300,
            },
          ]}
        >
          <Text variant="subheadDefault">Join my Discord Server</Text>
          <Text color="dimmer" variant="small" multiline>
            For security purposes, you must verify your email address to talk in
            my discord server. Authorize with discord to continue.
          </Text>
          <Button text="Authorize Discord" onClick={verify} />

          {error ? (
            <View
              css={[
                rcss.p(8),
                rcss.borderRadius(8),
                {
                  background: "#a8325048",
                  border: `solid 1px #c7486756`,
                },
              ]}
            >
              <Text variant="small">
                {errors[error] || decodeURIComponent(error)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/me",
      },
    };
  }

  return {
    props: {
      error: query?.error || "",
    },
  };
}
