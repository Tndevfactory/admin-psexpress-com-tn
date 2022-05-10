<template>
  <v-navigation-drawer dark permanent color="grey darken-4">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Psexpress </v-list-item-title>
        <v-list-item-subtitle> Administration </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <router-link
              :to="{ name: item.route }"
              style="text-decoration: none"
              class="white--text"
            >
              {{ item.title }}
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DrawerApp",

  data: () => ({
    items: [
      { title: "Categories", icon: "mdi-view-dashboard", route: "categories" },
      {
        title: "Sous categories",
        icon: "mdi-view-dashboard-edit-outline",
        route: "sous-categories",
      },
      {
        title: "Products",
        icon: "mdi-video-input-component",
        route: "products",
      },
      { title: "Sales", icon: "mdi-currency-usd", route: "sales" },
      { title: "Discount", icon: "mdi-sack-percent", route: "sales" },
      {
        title: "Fee seller ",
        icon: "mdi-cards-playing-diamond-multiple-outline",
        route: "sales",
      },
      { title: "Tax", icon: "mdi-currency-usd-off", route: "sales" },
      { title: "Shops", icon: "mdi-cart", route: "sales" },
      {
        title: "Orders",
        icon: "mdi-basket-check-outline",
        route: "orders",
      },
      { title: "Coupons", icon: "mdi-percent", route: "products" },
      { title: "Users", icon: "mdi-account", route: "users" },
      {
        title: "Permissions",
        icon: "mdi-account-switch",
        route: "permissions",
      },
      {
        title: "Flash Sales",
        icon: "mdi-lightning-bolt-circle",
        route: "flash-sales",
      },
      { title: "Deal of day", icon: "mdi-binoculars", route: "deal-of-day" },

      {
        title: "Transport",
        icon: "mdi-truck-cargo-container",
        route: "transport",
      },
      { title: "Statistique", icon: "mdi-chart-bar", route: "stats" },
    ],
    right: null,
  }),
};
</script>
