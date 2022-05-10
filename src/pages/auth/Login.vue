<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-container
      class="justify-lg-center align-center d-flex"
      style="height: 100vh"
    >
      <v-row>
        <v-col cols="12" md="6" offset-md="3" justify-center>
          <v-card class="pa-5">
            <span class="d-block text-h4 text-center primary--text">
              <v-btn icon>
                <v-icon large>mdi-cog-outline</v-icon>
              </v-btn>
              <span class="text-h5"> ADMININSTATION </span>
            </span>

            <v-text-field
              v-model="email"
              label="Email"
              type="text"
              :rules="emailRules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              hide-details="auto"
            ></v-text-field>

            <v-btn type="submit" :disabled="!valid" class="mt-5" color="primary"
              >Connexion</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LoginPage",

  components: {},

  data() {
    return {
      email: "",
      password: "",
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail est obligatoire.",
        (v) => /.+@.+/.test(v) || "E-mail doit etre valide",
      ],
      passwordRules: [
        (value) => !!value || "Mot de passe obligatoire.",
        (value) => (value && value.length >= 8) || "Min 8 caracteres",
      ],
    };
  },

  computed: {
    ...mapGetters(["getIsAuthenticated"]),
  },
  // watch: {
  //   getIsAuthenticated(newval, oldval) {
  //     console.log(newval);
  //     if (newval) {
  //       this.$router.push({ path: "/products" });
  //     }
  //   },
  // },
  methods: {
    ...mapActions(["adminLogin"]),

    submit() {
      let cred = {
        email: this.email,
        password: this.password,
      };
      this.adminLogin(cred);
    },
  },

  created() {
    // this.setHi();
  },
};
</script>
