import axios from "axios";
import router from "../../router/index";
import store from "../index";
import common from "./common";

// console.log(mutations);
// console.log(store._mutations);
// const {
//   setSnackbarError,
//   setSnackbarSuccess,
//   setSnackbarSuccessTex,
//   setSnackbarErrorText,
//   setLoading,
// } = store._mutations;

const state = {
  products: [],
};

const getters = {
  getProducts: (state) => state.products,
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
};
const actions = {
  async productsList({ commit }) {
    commit("setLoading", true);
    let url = `${process.env.VUE_APP_BASE_URL}/api-all-products`;

    try {
      const response = await axios.get(url);
      console.log(response.data.products);

      // commit("setSnackbarSuccess", true);
      // commit("setSnackbarSuccessText", "data received");
      commit("setProducts", response.data.products);
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      commit("setSnackbarError", false);
      commit("setSnackbarSuccess", false);
      commit("setSnackbarSuccessText", "");
      commit("setSnackbarErrorText", "");
      commit("setLoading", false);
    }, 4000);
  },

  async createProduct({ commit }, data) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    commit("setLoading", true);

    let url = `${process.env.VUE_APP_BASE_URL}/api-create-product`;

    try {
      const response = await axios.post(url, data, config);
      console.log(response);
      commit("setSnackbarSuccess", true);
      commit("setSnackbarSuccessText", "product created");
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      commit("setSnackbarError", false);
      commit("setSnackbarSuccess", false);
      commit("setSnackbarSuccessText", "");
      commit("setSnackbarErrorText", "");
      commit("setLoading", false);
    }, 4000);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
