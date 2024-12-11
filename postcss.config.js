export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      'postcss-preset-env': {
        features: {
          'nesting-rules': true,
        },
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          // Prevent merging of identical properties that might affect our layout
          mergeLonghand: false,
          mergeRules: false,
        }],
      }
    } : {})
  },
}
