module.exports = {
  extends: ["./node_modules/poetic/config/eslint/eslint-config.js"],
  // Add custom rules here
  rules: {
    "react/prop-types": 0,
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": "off"
  }
};
