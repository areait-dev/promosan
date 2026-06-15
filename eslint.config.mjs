import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Aggiungi regole per React
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Disabilita la regola che richiede React in scope
      'react/jsx-uses-react': 'off',      // Disabilita l'uso di React per JSX
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;