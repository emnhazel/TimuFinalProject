<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <nav>
    <v-app-bar color="#e56f48" >
  
      <v-spacer></v-spacer>
      <v-btn icon color="white">
        <v-icon>mdi-earth</v-icon>
      </v-btn>
      <v-btn icon color="white">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

   
    <v-navigation-drawer v-if="isToken" v-model="drawer" :style="{ backgroundColor: name }">
      <v-list>
        <v-list-item class="mb-10 mt-10 d-flex justify-center">
          <v-icon style="font-size: 82px; color: white"
            >mdi-home-account</v-icon
          >
        </v-list-item>

        <v-list-item :value="username" class="mb-10 mt-10 d-flex justify-center">
         
        </v-list-item>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          router
          :to="item.route"
          class="my-4 mt-15"
        >
          <v-icon style="color: white">{{ item.icon }}</v-icon>
          <v-list-item-content>
            <v-list-item-title style="color: white">{{
              item.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="my-4 mt-15">
          <v-btn @click="logout">Log Out</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isToken: localStorage.getItem('access_token'),
      username: '',
      drawer: true,
      name: "#252e46",
      items: [
        { text: "DASHBOARD", icon: "mdi-view-dashboard", route: "/home" },
        { text: "USER SETTINGS", icon: "mdi-cogs", route: "settings" },
      ],
    };
  },
  methods:{
    logout(){
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      this.$router.push('/')
    }
  }
};
</script>

<style scoped></style>
