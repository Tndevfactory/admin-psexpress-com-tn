<template>
  <v-row class="">
    <v-col app cols="2">
      <div
        style="
          position: fixed;
          top: 0;
          left: 0;
          max-width: 17.5%;
          height: 100vh;
        "
      >
        <Drawer />
      </div>
    </v-col>
    <v-col cols="10" style="background: transparent">
      <Navbar />
      <v-container>
        <div class="px-1">
          <router-view />
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Drawer from "@/components/Drawer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Drawer,
  },
};
</script>

<style lang="scss"></style>
