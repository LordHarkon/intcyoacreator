import { createApp } from "vue";
import { createPinia } from "pinia";
import VueLazyLoad from "vue3-lazyload";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Sanitization
import sanitizeHTML from "sanitize-html";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(VueLazyLoad);

app.config.globalProperties.$sanitize = sanitizeHTML;

app.mount("#app");
