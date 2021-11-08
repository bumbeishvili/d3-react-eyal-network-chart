export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    controls: { expanded: true },
    layout: "fullscreen",
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}