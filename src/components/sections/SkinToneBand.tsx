const tones = ["bg-tone-1", "bg-tone-2", "bg-tone-3", "bg-tone-4", "bg-tone-5", "bg-tone-6"];

interface SkinToneBandProps {
  /** 56px under the hero. The default is the 10px divider. */
  tall?: boolean;
}

/**
 * Six equal bands, light to deep. Always all six, never labelled,
 * and at most twice on the page.
 */
export function SkinToneBand({ tall = false }: SkinToneBandProps) {
  return (
    <div aria-hidden="true" className={`grid w-full grid-cols-6 ${tall ? "h-14" : "h-2.5"}`}>
      {tones.map((tone) => (
        <div key={tone} className={tone} />
      ))}
    </div>
  );
}
