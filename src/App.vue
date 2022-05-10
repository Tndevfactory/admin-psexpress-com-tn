<template>
  <v-app id="#app">
    <router-link to="/" style="text-decoration: none" class="black--text">
    </router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "@/pages/auth/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
  computed: {
    ...mapGetters(["getIsAuthenticated"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  overflow-x: hidden;
}
</style>
