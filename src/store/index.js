import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";

import common from "./modules/common";
import auth from "./modules/auth";
import products from "./modules/products";
import orders from "./modules/orders";

// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    orders,
    common,
    auth,
  },
  plugins: [createPersistedState()],
});
