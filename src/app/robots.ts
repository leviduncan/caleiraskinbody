import type { MetadataRoute } from "next";
import { IS_STAGING } from "@/config/site-env";

// Required for the static export: robots.txt is written at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return IS_STAGING
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" } };
}
