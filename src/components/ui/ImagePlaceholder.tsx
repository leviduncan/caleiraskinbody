interface ImagePlaceholderProps {
  label: string;
}

/** Warm tone block with a small label, shown until a slot has a real photo. */
export function ImagePlaceholder({ label }: ImagePlaceholderProps) {
  return (
    <div className="placeholder">
      <span>{label}</span>
    </div>
  );
}
