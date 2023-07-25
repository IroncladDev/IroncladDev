import useModal, { state } from "application/hooks/useModal";
import { RenderedComponent } from "application/types";
import { Gallery as GalleryComponent } from ".";
import { View, rcss } from "application/ui";
import { useAtom } from "jotai";

export const Modal = () => {
  const [componentProps] = useAtom(state.ComponentProps);
  const [componentName] = useAtom(state.ComponentName);
  const { close } = useModal();

  return componentName ? (
    <View
      css={[
        {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
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
        onClick={close}
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
        {componentName === RenderedComponent.Gallery ? (
          <GalleryComponent {...componentProps} />
        ) : null}
      </View>
    </View>
  ) : null;
};
