import { css } from "@emotion/react";
import { rcss, tokens } from "application/ui";

const Styles = {
  Container: css([
    rcss.flex.column,
    {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    },
  ]),
  BodyContainer: css({
    flex: 1,
    display: "flex",
    overflowY: "auto",
    overflowX: "hidden",
  }),

  HeaderContentContainer: css([
    rcss.flex.row,
    rcss.align.center,
    rcss.flex.grow(1),
    {
      maxWidth: tokens.maxBodyWidth,
      width: "100%",
      justifyContent: "center",
    },
    rcss.handleMaxWidth(675, {
      flexDirection: "column",
    }),
  ]),
  HeaderContentText: css([
    rcss.p(16),
    rcss.flex.column,
    rcss.colWithGap(8),
    {
      width: "40%",
    },
    rcss.handleMaxWidth(675, {
      width: "100%",
      "& > *": {
        textAlign: "center",
      },
    }),
  ]),

  HeaderContentTextCenter: css([
    rcss.p(16),
    rcss.flex.column,
    rcss.colWithGap(8),
    {
      width: "40%",
      "& > *": {
        textAlign: "center",
      },
    },
    rcss.handleMaxWidth(675, {
      width: "100%",
    }),
  ]),

  DownButton: css([
    rcss.p(16),
    rcss.borderRadius("full"),
    {
      border: `solid 2px ${tokens.linearDefault}`,
      background: `rgba(0, 0, 0, 0.1)`,
      cursor: "pointer",
      transition: "0.25s",
      position: "relative",
      "&:hover": {
        background: `rgba(0, 0, 0, 0.15)`,
        boxShadow: `0 0 0 8px ${tokens.subgroundHigher}`,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "calc(50% - 10px)",
        borderRadius: 4,
        width: 12,
        height: 2,
        background: tokens.linearDefault,
        transform: "rotate(45deg)",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "calc(50% - 2px)",
        borderRadius: 4,
        width: 12,
        height: 2,
        background: tokens.linearDefault,
        transform: "rotate(-45deg)",
      },
    },
  ]),

  HeaderContents: css([
    rcss.flex.column,
    rcss.colWithGap(8),
    rcss.handleMaxWidth(675, {
      display: "block",
      "& h1, & h2": {
        display: "inline-block",
        margin: "4px 8px",
      },
    }),
  ]),

  HeaderTitleMain: css({
    background: `-webkit-linear-gradient(135deg, ${tokens.accentPrimaryDimmer}, ${tokens.accentPrimaryStronger})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeHeaderBig,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1,
  }),

  HeaderTitleSecondary: css({
    background: `-webkit-linear-gradient(120deg, ${tokens.subgroundHighest}, ${tokens.linearDefault})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeHeaderBig,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1,
  }),

  HeaderTitleLast: css({
    background: `-webkit-linear-gradient(120deg, ${tokens.linearHighest}, ${tokens.linearDefault})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeSubheadDefault,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1.1,
  }),
};

export default Styles;
