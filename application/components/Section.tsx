import { View, rcss, tokens } from "application/ui";
import { ReactNode } from "react";
import { ObjectAny } from "application/types";

export const Section = ({
  children,
  background,
  head,
  ...props
}: {
  css?: ObjectAny | Array<ObjectAny>;
  children?: ReactNode;
  id?: string;
  className?: string;
  background?: string;
  head?: ReactNode;
}) => {
  return (
    <View
      css={[
        rcss.flex.column,
        {
          minHeight: "100vh",
          background,
        },
      ]}
    >
      {head}
      <View
        css={[
          rcss.flex.column,
          {
            maxWidth: tokens.maxBodyWidth,
            width: "100%",
            height: "100%",
            alignSelf: "center",
          },
        ]}
        {...props}
      >
        {children}
      </View>
    </View>
  );
};
