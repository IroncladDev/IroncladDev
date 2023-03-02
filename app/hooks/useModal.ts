import { atom, useAtom } from "jotai";
import { ObjectAny } from "app/types";
import { RenderedComponent } from "app/types";

export const state = {
  ComponentName: atom<RenderedComponent | null>(null),
  ComponentProps: atom<ObjectAny>({}),
};

const useModal = () => {
  const [, setComponentName] = useAtom(state.ComponentName);
  const [, setComponentProps] = useAtom(state.ComponentProps);

  const open = ({
    component,
    props,
  }: {
    component: RenderedComponent;
    props: ObjectAny;
  }) => {
    setComponentName(component);
    setComponentProps(props);
  };

  const close = () => {
    setComponentName(null);
    setComponentProps({});
  };

  return { open, close };
};

export default useModal;
