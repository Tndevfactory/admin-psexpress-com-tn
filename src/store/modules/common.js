import axios from "axios";

const state = {
  snackbarSuccess: false,
  snackbarError: false,
  snackbarSuccessText: "",
  snackbarErrorText: "",
  loading: false,
};

const getters = {
  getSnackbarSuccess: (state) => state.snackbarSuccess,
  getSnackbarError: (state) => state.snackbarError,
  getSnackbarSuccessText: (state) => state.snackbarSuccessText,
  getSnackbarErrorText: (state) => state.snackbarErrorText,
  getLoading: (state) => state.loading,
};

const mutations = {
  setLoading: (state, newStatus) => (state.loading = newStatus),
  setSnackbarSuccess: (state, newStatus) => (state.snackbarSuccess = newStatus),
  setSnackbarError: (state, newStatus) => (state.snackbarError = newStatus),
  setSnackbarSuccessText: (state, newStatus) =>
    (state.snackbarSuccessText = newStatus),
  setSnackbarErrorText: (state, newStatus) =>
    (state.snackbarErrorText = newStatus),
};
const actions = {
  closeSnackbarSuccess({ commit }) {
    commit("setSnackbarSuccess", false);
  },
  closeSnackbarError({ commit }) {
    commit("setSnackbarError", false);
  },
  closeLoading({ commit }) {
    commit("setLoading", false);
  },
  resetSnack({ commit }) {
    commit("setSnackbarError", false);
    commit("setSnackbarSuccess", false);
    commit("getSnackbarSuccessText", "");
    commit("getSnackbarErrorText", "");
    commit("setLoading", false);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
