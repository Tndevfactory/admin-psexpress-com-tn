<template>
  <div>
    <div class="d-flex justify-space-between mr-6 mb-6">
      <v-btn color="secondary" text> Gestion des sous Categories</v-btn>
      <v-btn color="primary" @click="handleCreateDialog"> create</v-btn>
    </div>
    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      snackbar with <strong>outlined</strong> property.
    </v-snackbar>
    <v-simple-table fixed-header height="1000px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left grey white--text">Id</th>
            <th class="text-left grey white--text">Nom</th>
            <th class="text-left grey white--text">Price</th>
            <th class="text-left grey white--text">PriceL1</th>
            <th class="text-left grey white--text">PriceL2</th>
            <th class="text-left grey white--text">PriceL3</th>
            <th class="text-left grey white--text">Stock</th>
            <th class="text-left grey white--text">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in getProducts" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.fr_product_name }}</td>
            <td>{{ p.price }}</td>
            <td>{{ p.price_seuil0 }}</td>
            <td>{{ p.price_seuil1 }}</td>
            <td>{{ p.price_seuil2 }}</td>
            <td>{{ p.seller_id }}</td>
            <td>
              <v-icon
                @click="handleUpdateDialog(p.id)"
                class="mr-5 orange--text"
                title="update"
                >mdi-pencil</v-icon
              >
              <v-icon
                @click="handleDeleteDialog(p.id)"
                title="delete"
                class="red--text"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-snackbar
      color="success"
      absolute
      centered
      top
      v-model="getSnackbarSuccess"
      :vertical="vertical"
    >
      <v-icon>mdi-check-outline</v-icon> {{ getSnackbarSuccessText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="closeSnackbarSuccess"
          small
        >
          X
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      color="red"
      absolute
      centered
      top
      v-model="getSnackbarError"
      :vertical="vertical"
    >
      <v-icon>mdi-alert-circle-outline</v-icon> {{ getSnackbarErrorText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          small
          color="white"
          text
          v-bind="attrs"
          @click="closeSnackbarError"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="createDialog" persistent max-width="1600px">
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="handleCreate"
        enctype="multipart/form-data"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Creation nouveau produit</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="newProductItem.fr_product_ref"
                    type="text"
                    :rules="fr_product_nameRules"
                    hide-details="auto"
                    label="Nom-fr*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="newProductItem.en_product_ref"
                    type="text"
                    hide-details="auto"
                    label="Nom-en*"
                    hint=""
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="newProductItem.ar_product_ref"
                    type="text"
                    hide-details="auto"
                    label="Nom-ar*"
                    hint=""
                    dir="rtl"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea
                    v-model="newProductItem.fr_description"
                    type="text"
                    hide-details="auto"
                    label="fr_description*"
                    hint=""
                    persistent-hint
                    required
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea
                    v-model="newProductItem.en_description"
                    type="text"
                    hide-details="auto"
                    label="en_description*"
                    hint=""
                    persistent-hint
                    required
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-textarea
                    v-model="newProductItem.ar_description"
                    type="text"
                    hide-details="auto"
                    label="ar_description*"
                    hint=""
                    dir="rtl"
                    persistent-hint
                    required
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.fee"
                    :items="fees"
                    label="Frais vendeur*"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.seuil0"
                    label="Qty Seuil-1"
                    hint=""
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Qty Seuil-2*"
                    v-model="newProductItem.seuil1"
                    hint=""
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.seuil2"
                    label="Qty Seuil-3*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.price"
                    label="Prix-de-base"
                    hint="prix initial"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.price_seuil0"
                    label="Prix seuil-1*"
                    hint=""
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.price_seuil1"
                    label="Prix seuil-2*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    v-model="newProductItem.price_seuil2"
                    label="Prix seuil-3*"
                    hint=""
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Remise*"
                    v-model="newProductItem.discount"
                    hint="un chiffre de pourcentage exemple: 2 ou 3.5"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.color"
                    :items="couleurs"
                    label="Couleur"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.brand"
                    :items="marques"
                    label="Marque"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.tax"
                    :items="taxes"
                    label="Tax"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.dimension"
                    :items="dimensions"
                    label="Dimension"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.stock_id"
                    :items="categories"
                    label="Categorie"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.substock_id"
                    :items="sousCategories"
                    label="Sous Categorie"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="newProductItem.shop_id"
                    :items="shops"
                    label="Shop"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <label for="photo1">Photo1</label>
                  <input name="photo1" type="file" v-on:change="onChange1" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo1">Photo2</label>
                  <input name="photo2" type="file" v-on:change="onChange2" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo3">Photo3</label>
                  <input name="photo3" type="file" v-on:change="onChange3" />
                </v-col>
              </v-row>
            </v-container>
            <small>*champs obligatoires</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="createDialog = false">
              Annuler
            </v-btn>
            <v-btn type="submit" :disabled="!valid" color="primary">
              Valider
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="updateDialog" persistent max-width="1600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Mise a jour du produit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="updateDialog = false">
            Annuler
          </v-btn>
          <v-btn
            :loading="getLoading"
            :disabled="getLoading"
            color="orange darken-1"
            text
            @click="handleUpdate"
          >
            Mise a jour
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Suppression d'enregisrement
        </v-card-title>

        <v-card-text>
          Etes vous sur de vouloir supprimer cet enregistrement ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Annuler
          </v-btn>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="red darken-1"
            text
            @click="handleDelete"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Substock",

  components: {},

  data() {
    return {
      valid: true,
      fr_product_nameRules: [(v) => !!v || "champ est obligatoire."],
      fileRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      fees: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      taxes: [3, 6, 12, 16, 19, 20, 21, 25, 30],
      marques: ["samsung", "asus", "apple", "hp"],
      couleurs: [
        "noir",
        "bleu",
        "vert",
        "rouge",
        "blanc",
        "jaune",
        "orange",
        "gris",
      ],
      dimensions: ["17", "14", "15", "21", "25", "xl"],
      categories: ["Informatique", "telephonie", "Electromenager"],
      sousCategories: ["laptop", "desktop", "tablette"],
      shops: ["marsa-info", "sellester", "Fizz-saloon", "Buzz-seller"],

      snackbarSuccess: false,
      snackbarError: false,
      snackbarSuccessText: "Task done with success",
      snackbarErrorText: "Something went wrong",
      vertical: true,
      loader: null,
      loading: false,
      createDialog: false,
      updateDialog: false,
      deleteDialog: false,
      newProductItem: {
        fr_product_ref: "",
        fr_description: "",

        ar_product_ref: "",
        ar_description: "",

        en_product_ref: "",
        en_description: "",

        seuil0: "",
        seuil1: "",
        seuil2: "",

        price: "",
        price_seuil0: "",
        price_seuil1: "",
        price_seuil2: "",

        brand: "",
        color: "",
        dimension: "",
        discount: "",

        fee: "",

        tax: "",

        shop_name: "",
        shop_id: "",
        stock_id: "",
        substock_id: "",
      },

      updateItem: {
        id: "",
        name: "",
        price: "",
        pricel1: "",
        pricel2: "",
        pricel3: "",
        qty: "",
      },
      deleteItem: {
        id: "",
      },
      photo1: "",
      photo2: "",
      photo3: "",
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      // setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  computed: {
    ...mapGetters([
      "getSnackbarSuccess",
      "getSnackbarSuccessText",
      "getSnackbarError",
      "getSnackbarErrorText",
      "getLoading",
      "getProducts",
    ]),
  },

  methods: {
    ...mapActions([
      "closeSnackbarSuccess",
      "closeSnackbarError",
      "productsList",
      "createProduct",
    ]),

    handleCreateDialog() {
      this.createDialog = true;
    },
    onChange1(e) {
      this.photo1 = e.target.files[0];
      console.log(this.photo);
    },
    onChange2(e) {
      this.photo2 = e.target.files[0];
      console.log(this.photo);
    },
    onChange3(e) {
      this.photo3 = e.target.files[0];
      console.log(this.photo);
    },
    handleCreate() {
      this.loader = this.getLoading;

      let data = new FormData();
      data.append("photo1", this.photo1);
      data.append("photo2", this.photo2);
      data.append("photo3", this.photo3);
      data.append("info", "simple info");
      for (const [key, value] of Object.entries(this.newProductItem)) {
        console.log(`${key}: ${value}`);
        data.append(key, value);
      }

      console.log(data.get("photo"));

      this.createProduct(data);

      // setTimeout(() => {
      //   this.createDialog = false;
      // }, 300);
    },
    handleUpdateDialog(id) {
      console.log(id);

      let updItem = this.getProducts.find((p) => p.id === id);
      console.log(updItem);

      this.updateItem = updItem;

      this.updateDialog = true;
    },
    handleUpdate() {
      console.log("call api to update");

      this.productsList();

      setTimeout(() => {
        this.updateDialog = !this.getLoading;
      }, 300);
    },
    handleDeleteDialog(id) {
      console.log(id);
      this.deleteDialog = true;
    },
    handleDelete() {
      this.loader = this.getLoading;
      console.log("call api to delete");
      setTimeout(() => {
        this.deleteDialog = false;
      }, 300);
    },
  },
  created() {
    this.productsList();
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
