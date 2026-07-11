/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  // three.js ships untranspiled ESM add-ons; Next must transpile them for the
  // /alema experience (react-three-fiber / drei) to build under static export.
  transpilePackages: ["three"],
};

export default nextConfig;
