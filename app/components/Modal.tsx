import { View, rcss } from "app/ui";
import useModal, { state } from "app/hooks/useModal";
import { useAtom } from "jotai";
import { RenderedComponent } from "app/types";
import { Gallery as GalleryComponent } from ".";

export const Modal = () => {
  const [componentName] = useAtom(state.ComponentName);
  const [componentProps] = useAtom(state.ComponentProps);
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
