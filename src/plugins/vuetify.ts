import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          surface: "#0f0b0c",
          primary: "#D2B681",
          secondary: "#E4D6BB",
          "on-surface": "#E4D6BB",
          "surface-variant": "#2A1B12",
          "on-surface-variant": "#E4D6BB",
        },
      },
    },
  },
});
