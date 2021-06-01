<template>
  <v-app>
    <v-app-bar color="primary" fixed app>
      <v-toolbar-title>Foxwoods' Opinion Ate</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <RestaurantIndexPage />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RestaurantIndexPage from '@/components/RestaurantIndexPage';

export default {
  name: 'App',
  components: {RestaurantIndexPage},
};
</script>
