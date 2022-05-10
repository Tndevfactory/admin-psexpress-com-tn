import axios from "axios";
import router from "../../router/index";
const state = {
  orders: "",
};

const getters = {
  getOrders: (state) => state.orders,
};

const mutations = {
  setOrders: (state, orders) => (state.orders = orders),
};
const actions = {
  async adminLogout({ commit }) {
    let url = `${process.env.VUE_APP_BASE_URL}/admin-logout`;

    try {
      const response = await axios.get(url);

      commit("setIsAuthenticated", response.data.isAuthenticated);
      commit("setUserType", response.data.role);
      router.push({ path: "/" });
    } catch (err) {
      console.log(err);
    }
  },

  async adminLogin({ commit }, cred) {
    console.log(cred);
    let url = `${process.env.VUE_APP_BASE_URL}/admin-login`;

    try {
      const response = await axios.post(url, { cred });
      commit("setIsAuthenticated", response.data.isAuthenticated);
      commit("setUserType", response.data.role);
      router.push({ path: "/products" });
    } catch (err) {
      console.log(err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
