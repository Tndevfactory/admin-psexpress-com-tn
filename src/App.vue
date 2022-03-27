<template>
  <v-app>
    <Navbar />
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HelloWorld from "./components/HelloWorld";
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
