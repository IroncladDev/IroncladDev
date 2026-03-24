export default {
  bracketSameLine: true,
  semi: false,
  singleQuote: true,
  astroAllowShorthand: true,
  plugins: ['prettier-plugin-astro'],
  tabWidth: 4,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
