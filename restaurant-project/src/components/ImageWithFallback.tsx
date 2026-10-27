import { ImgHTMLAttributes, SyntheticEvent } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc: string };

function ImageWithFallback({ fallbackSrc, src, ...props }: Props) {
  const showFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackSrc;
  };

  return <img {...props} src={src || fallbackSrc} onError={showFallback} />;
}

export default ImageWithFallback;
