<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-footer dark padless app inset id="background-class">
    <v-card-text class="py-2 white-text text-center">
      {{ new Date().getFullYear() }} — <strong>VUETIFY</strong>
    </v-card-text>
  </v-footer>
</template>

<style>
#background-class {
  background-color: #252e46;
}
.white-text{
    color:white;
}
</style>
