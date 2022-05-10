import axios from "axios";
import router from "../../router/index";
const state = {
  isAuthenticated: false,
  user: {
    type: "",
  },
};

const getters = {
  getIsAuthenticated: (state) => state.isAuthenticated,
};

const mutations = {
  setIsAuthenticated: (state, newStatus) => (state.isAuthenticated = newStatus),
  setUserType: (state, userType) => (state.user.type = userType),
};
const actions = {
  async adminLogout({ commit }) {
    let url = `${process.env.VUE_APP_BASE_URL}/admin-logout`;

    try {
      const response = await axios.get(url);

      commit("setIsAuthenticated", response.data.isAuthenticated);
      commit("setUserType", response.data.role);
      // router.push({ path: "/" });
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
      // router.push({ path: "/products" });
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
