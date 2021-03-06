module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    "@babel/preset-typescript",
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ],
  plugins: [
    "@babel/transform-runtime",
    "@vue/babel-plugin-jsx", // https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
  ],
};
