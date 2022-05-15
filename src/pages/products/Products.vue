<template>
  <div>
    <div class="d-flex justify-space-between mr-6 mb-6">
      <v-btn color="secondary" text> Gestion des produits</v-btn>
      <v-btn color="primary" @click="handleCreateDialog"> create</v-btn>
    </div>
    <!-- <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      snackbar with <strong>outlined</strong> property.
    </v-snackbar> -->
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
            <td>{{ p.fr_product_ref }}</td>
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
                    item-value="id"
                    item-text="name"
                    label="Shop"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <label for="photo1">Photo1</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo1"
                    type="file"
                    v-on:change="onChange1"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo2">Photo2</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo2"
                    type="file"
                    v-on:change="onChange2"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo3">Photo3</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo3"
                    type="file"
                    v-on:change="onChange3"
                  ></v-file-input>
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
      <v-form
        ref="formUpdate"
        v-model="valid"
        @submit.prevent="handleUpdate"
        enctype="multipart/form-data"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Mise a jour du produit</span>
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
                    item-value="id"
                    item-text="name"
                    label="Shop"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <label for="photo1">Photo1</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo1"
                    type="file"
                    v-on:change="onChange1"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo2">Photo2</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo2"
                    type="file"
                    v-on:change="onChange2"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label for="photo3">Photo3</label>
                  <v-file-input
                    counter
                    multiple
                    truncate-length="15"
                    name="photo3"
                    type="file"
                    v-on:change="onChange3"
                  ></v-file-input>
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
            <v-btn type="submit" :disabled="!valid" color="warning">
              Mise a jour</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="500" persistent>
      <v-form ref="formDelete" @submit.prevent="handleDelete">
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
            <!-- <v-btn
              :loading="loading"
              :disabled="loading"
              color="red darken-1"
              text
              @click="handleDelete"
            >
              Supprimer
            </v-btn> -->
            <v-btn type="submit" :disabled="!valid" color="error">
              Supprimer</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductsPage",

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
      shops: [
        { id: 1, name: "marsa-info" },
        { id: 2, name: "sellester" },
        { id: 3, name: "Fizz-saloon" },
        { id: 4, name: "Buzz-seller" },
      ],

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
        ar_product_ref: "",
        en_product_ref: "",

        fr_description: "",
        ar_description: "",
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
        weight: "",

        discount: "",
        fee: "",
        tax: "",

        shop_id: "",
        stock_id: "",
        substock_id: "",
      },

      idToDelete: "",
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
      "updateProduct",
      "deleteProduct",
    ]),

    handleCreateDialog() {
      this.createDialog = true;
    },
    onChange1(files) {
      console.log("checking v-file event");
      console.log(files);
      this.photo1 = files[0];
      console.log(this.photo1);
    },
    onChange2(files) {
      this.photo2 = files[0];
      console.log(this.photo2);
    },
    onChange3(files) {
      this.photo3 = files[0];
      console.log(this.photo3);
    },
    handleCreate() {
      this.loader = this.getLoading;

      let data = new FormData();
      data.append("photo1", this.photo1);
      data.append("photo2", this.photo2);
      data.append("photo3", this.photo3);
      data.append("method", "handleCreate");

      for (const [key, value] of Object.entries(this.newProductItem)) {
        console.log(`${key}: ${value}`);
        data.append(key, value);
      }

      //console.log(data.get("photo"));

      this.createProduct(data);
      this.createDialog = false;
      // setTimeout(() => {
      //   this.createDialog = false;
      // }, 300);
    },
    handleUpdateDialog(id) {
      //console.log(id);

      let updItem = this.getProducts.find((p) => p.id === id);

      this.newProductItem = updItem;
      // console.log(this.newProductItem);
      this.updateDialog = true;
    },
    handleUpdate() {
      console.log("handleUpdate");

      let upd = new FormData();
      upd.append("photo11", this.photo1);
      upd.append("photo22", this.photo2);
      upd.append("photo33", this.photo3);
      upd.append("_method", "put");
      upd.append("t", 5);

      for (const [key, value] of Object.entries(this.newProductItem)) {
        upd.append(key, value);
        //console.log(`${key}: ${value}`);
      }
      let gr = { t: 5 };
      this.updateProduct(upd);
      this.updateDialog = false;
      //console.log(data);
    },
    handleDeleteDialog(id) {
      // console.log(id);
      this.idToDelete = id;
      this.deleteDialog = true;
    },
    handleDelete() {
      console.log("handleDelete");

      let delt = new FormData();
      delt.append("id", this.idToDelete);
      delt.append("_method", "delete");

      console.log(delt);
      this.deleteProduct(delt);
      this.deleteDialog = false;
      this.productsList();
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
