import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigAsPlugin } from "@eslint/compat";

export default [
  {files: ["**/*.{js,mjs,cjs,ts,tsx}"], languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  fixupConfigAsPlugin(pluginReactConfig),
  {
    rules: {
      // Custom rules to fit project needs
      "react/react-in-jsx-scope": "off", // For React 17+ JSX transform
      "react/prop-types": "off", // Using TypeScript for prop types
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    }
  }
];