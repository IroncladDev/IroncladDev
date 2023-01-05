import { ReactNode } from "react";
import { Space, View, rcss } from ".";

export const FlexRow = ({
  gap = 0,
  center = false,
  ...props
}: {
  gap?: Space;
  center?: boolean;
  children: ReactNode;
}) => {
  return (
    <View
      css={[
        rcss.flex.row,
        rcss.rowWithGap(gap),
        center ? rcss.align.center : undefined,
      ]}
      {...props}
    />
  );
};

export const FlexCol = ({
  gap = 0,
  center = false,
  ...props
}: {
  gap?: Space;
  center?: boolean;
  children: ReactNode;
}) => {
  return (
    <View
      css={[
        rcss.flex.column,
        rcss.colWithGap(gap),
        center ? rcss.justify.center : undefined,
      ]}
      {...props}
    />
  );
};

export const FlexSpacer = ({ amount = 2 }: { amount?: Space }) => (
  <View css={[rcss.flex.grow(amount)]} />
);
