import { PreloaderProps, preloaderSize } from "./types";
import { usePreloaderStyles } from "./styles";
import {
  PreloaderRegularIcon,
  PreloaderSemiboldIcon,
  PreloaderBoldIcon,
} from "../../icons";
import { useToken } from "@/theme";

export default function Preloader({
  size = preloaderSize.regular,
}: PreloaderProps) {
  const classes = usePreloaderStyles();

  const getPreloader = (size: preloaderSize) => {
    const sizeStr: Record<preloaderSize, string | number> = {
      [preloaderSize.regular]: useToken("preloader/size/name16"),
      [preloaderSize.semibold]: useToken("preloader/size/name16"),
      [preloaderSize.bold]: useToken("preloader/size/name18"),
    };
    
    switch (size) {
      case preloaderSize.semibold:
        return <PreloaderSemiboldIcon width={sizeStr[size]} height={sizeStr[size]} />;
      case preloaderSize.bold:
        return <PreloaderBoldIcon width={sizeStr[size]} height={sizeStr[size]} />;

      default:
        return <PreloaderRegularIcon width={sizeStr[size]} height={sizeStr[size]} />;
    }
  };

  return <div className={classes.preloader}>{getPreloader(size)}</div>;
}
