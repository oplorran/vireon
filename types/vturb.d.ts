import type { CSSProperties, DetailedHTMLProps, HTMLAttributes, Ref } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  id?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": Props;
    }
  }
}
