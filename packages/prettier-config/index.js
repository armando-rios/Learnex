/** @type {import('prettier').Config} */
const config = {
  // Básicas y modernas
  semi: true,
  singleQuote: true,
  printWidth: 100,
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,

  // Formato
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",

  // Overrides para archivos específicos
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 80,
        proseWrap: "always",
      },
    },
  ],
};

export default config;
