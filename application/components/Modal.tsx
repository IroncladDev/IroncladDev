import { View, rcss } from "application/ui";

export const Modal = ({
  children,
  isVisible,
  onClose,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}) => {
  return isVisible ? (
    <View
      css={[
        {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 100,
        },
      ]}
    >
      <View
        css={[
          rcss.position.absolute,
          {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `rgba(0, 0, 0, 0.5)`,
            zIndex: 101,
          },
        ]}
        onClick={onClose}
      />

      <View
        css={[
          rcss.position.absolute,
          {
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
            zIndex: 102,
          },
        ]}
      >
        {children}
      </View>
    </View>
  ) : null;
};
