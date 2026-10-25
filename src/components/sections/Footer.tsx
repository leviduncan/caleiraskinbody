import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { isLinkLive } from "@/lib/section-readiness";

const footerLink =
  "inline-flex min-h-11 min-w-11 items-center transition-colors duration-400 hover:text-ink-on-deep";

export function Footer() {
  const { brand, footer } = site;
  return (
    // The darkest brand brown, with the logo kit's dark set and the on-deep text colors.
    <footer id="footer" className="tone-deep bg-scrim text-ink-on-deep">
      <div className="container-x pt-16 pb-8 md:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            {/* The negative margins offset the logo's built-in clear space. */}
            <span role="img" aria-label={`${brand.name} ${brand.descriptor}`} className="block">
              <Logo lockup="stacked-on-dark" className="-mt-4 -ml-2.5 h-32" />
            </span>
            <p className="small mt-1 text-ink-on-deep-muted">{brand.tagline}</p>
          </div>

          {footer.columns
            .map((column) => ({
              ...column,
              lines: column.lines.filter((line) => !line.href || isLinkLive(line.href)),
            }))
            // A column whose links are all placeholders, such as Follow, is left out.
            .filter((column) => column.lines.length > 0)
            .map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow text-champagne">{column.title}</h2>
              <ul className="small mt-3 text-ink-on-deep-muted">
                {column.lines.map((line) => {
                  if (!line.href) {
                    return <li key={line.label}>{line.label}</li>;
                  }
                  const external = line.href.startsWith("http");
                  return (
                    <li key={line.label}>
                      <a
                        href={line.href}
                        className={footerLink}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {line.label}
                        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="caption mt-16 border-t border-champagne/30 pt-6 text-ink-on-deep-muted">
          {/* TODO: Florida F.S. 480.0465: MA and MM license numbers, address, and DOH phone required on massage ads. Awaiting from Kim. */}
          <p>{footer.compliance}</p>
          {footer.licenses ? <p className="mt-2">{footer.licenses}</p> : null}

          {/* Right padding keeps the last link clear of the pinned back-to-top button. */}
          <div className="mt-6 flex flex-col gap-x-8 gap-y-1 md:flex-row md:flex-wrap md:items-center md:justify-between md:pr-20">
            <p>{footer.copyright}</p>
            <ul className="flex flex-wrap items-center gap-x-6">
              {footer.legalLinks.filter((link) => isLinkLive(link.href)).map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                {footer.credit.href ? (
                  <a href={footer.credit.href} className={footerLink}>
                    {footer.credit.label}
                  </a>
                ) : (
                  <span>{footer.credit.label}</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
