import { forwardRef } from "react";
import { IFrameProps } from "./types";

const IFrame = forwardRef<HTMLIFrameElement, IFrameProps>((props, ref) => (
  <iframe height="100%" width="100%" src={props.url} ref={ref} />
));

IFrame.displayName = "IFrame";

export default IFrame;
