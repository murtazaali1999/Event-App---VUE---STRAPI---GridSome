<template>
  <v-app class="layout"
    ><!-- for vuetify, it uses flexbox -->
    <v-app-bar app class="app-bar">
      <v-toolbar-title>
        <g-link class="homelink" to="/">E-VENTS</g-link>
      </v-toolbar-title>
      <!--nav title -->
      <v-text-field
        placeholder="Search"
        class="ml-8"
        outlined
        rounded
        dense
        hide-details
        style="max-width:350px"
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        clearable
        @click:clear="search = ''"
      ></v-text-field>
      <v-spacer></v-spacer
      ><!-- justify content between title and button -->
      <v-btn>Create Button</v-btn>
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col sm="6" offset-sm="4">
          <slot :search="search" />
        </v-col>
      </v-row>
    </v-container>
    <v-main></v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style>
.layout {
  margin-top: 100px;
}

.homelink {
  text-decoration: none;
  font-style: none;
}
</style>
