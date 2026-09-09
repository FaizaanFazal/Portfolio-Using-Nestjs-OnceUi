import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  async redirects() {
    return [
      // Dev site moved under /dev — preserve old indexed URLs (plan.md §3.1).
      { source: "/about", destination: "/dev/about", permanent: true },
      { source: "/work", destination: "/dev/work", permanent: true },
      { source: "/work/:slug*", destination: "/dev/work/:slug*", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
