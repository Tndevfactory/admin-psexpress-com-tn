import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/index.js";
import VueCookies from "vue-cookies";
import router from "./router";

Vue.config.productionTip = true;

Vue.use(VueCookies);
Vue.use(Vuex);
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
