const nextConfig = {
  webpack(config) {
    // Find the Next.js rule that handles SVGs by default
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test instanceof RegExp && rule.test.test(".svg")) {
        rule.exclude = /\.svg$/i;
      } else if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (
            oneOfRule.test &&
            oneOfRule.test instanceof RegExp &&
            oneOfRule.test.test(".svg")
          ) {
            oneOfRule.exclude = /\.svg$/i;
          }
        });
      }
    });

    // Add @svgr/webpack loader for SVGs as React components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
// This configuration allows you to import SVG files as React components
