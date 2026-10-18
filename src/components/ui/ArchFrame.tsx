import { MediaFrame, type MediaFrameProps } from "./MediaFrame";

/**
 * The signature shape: rounded top, flat bottom, like a coquina doorway.
 * Used for portrait and step images.
 */
export function ArchFrame(props: Omit<MediaFrameProps, "arch">) {
  return <MediaFrame {...props} arch />;
}
