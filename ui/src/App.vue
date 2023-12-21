
<template>
  <v-app >
  <Navbar/>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: { Navbar,AppFooter},

  data() {
    return {};
  },
};
</script>
