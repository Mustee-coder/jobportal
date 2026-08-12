import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "uploads/**",
      "public/**",
      "dist/**",
    ],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
