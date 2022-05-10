<template>
  <v-app-bar flat class="px-md-9 transparent">
    <v-app-bar-title>
      <v-btn :loading="getLoading" :disabled="getLoading" text> </v-btn>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="adminLogout">mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavbarApp",

  data: () => ({
    drawer: false,
    group: null,
    loader: null,
    loading: false,
  }),
  computed: {
    ...mapGetters([
      "getIsAuthenticated",
      "getSnackbarSuccess",
      "getSnackbarSuccessText",
      "getSnackbarError",
      "getSnackbarErrorText",
      "getLoading",
    ]),
  },
  // watch: {
  //   getIsAuthenticated(newval, oldval) {
  //     console.log(newval);
  //     if (!newval) {
  //       // this.$router.push({ path: "/" });
  //     }
  //   },
  // },
  methods: {
    ...mapActions([
      "adminLogout",
      "closeSnackbarSuccess",
      "closeSnackbarError",
    ]),
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      // setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  created() {
    // this.setHi();
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
