const nodeSassMagicImporter = require(`node-sass-magic-importer`);

module.exports = {
  /**
   * Headers of the page.
   */
  head: {
    title: `starter`,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { hid: `description`, name: `description`, content: `` },
    ],
    link: [
      { rel: `icon`, type: `image/x-icon`, href: `/favicon.ico` },
    ],
  },
  /**
   * Customize the progress-bar color.
   */
  loading: { color: `#3B8070` },
  /**
   * Build configuration.
   */
  build: {
    /**
     * Run ESLint on save.
     */
    extend(config, ctx) {
      const vueLoader = config.module.rules.find(rule => rule.loader === `vue-loader`);

      vueLoader.query.loaders.scss = [
        { loader: `vue-style-loader?sourceMap` },
        { loader: `css-loader?sourceMap` },
        {
          loader: `sass-loader?sourceMap`,
          options: { importer: nodeSassMagicImporter() },
        },
      ];

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: `pre`,
          test: /\.(js|vue)$/,
          loader: `eslint-loader`,
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
