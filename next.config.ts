import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Point next-intl to the custom request config
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
  },
};

export default withNextIntl(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

// module.exports = nextConfig;