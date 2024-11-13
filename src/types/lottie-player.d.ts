declare module "@lottiefiles/react-lottie-player" {
  import { FC, CSSProperties } from "react";

  interface PlayerProps {
    src: string | object;
    autoplay: boolean;
    loop: boolean;
    style: CSSProperties;
  }

  const Player: FC<PlayerProps>;
  export { Player };
}
