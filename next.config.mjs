/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default nextConfig;
