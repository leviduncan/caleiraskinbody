interface ImagePlaceholderProps {
  /** Read by screen readers as the image's alt text. */
  label: string;
  /** Print the label on the block. Off for a slot that is live on the page. */
  showLabel?: boolean;
}

/** Warm tone block, shown until a slot has a real photo. */
export function ImagePlaceholder({ label, showLabel = true }: ImagePlaceholderProps) {
  return (
    <div className="placeholder" role="img" aria-label={label}>
      {showLabel ? <span aria-hidden="true">{label}</span> : null}
    </div>
  );
}
