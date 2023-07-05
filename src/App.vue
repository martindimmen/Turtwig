<script setup></script>

<template>
  <div
    id="nav"
    class="p-5 bg-gradient-to-r from-blue-800 to-purple-600 text-white flex justify-right items-center"
  >
    <div class="space-x-4">
      <router-link
        class="text-white text-lg hover:text-yellow-300 transition-colors"
        to="/"
        >Home</router-link
      >
      <router-link
        class="text-white text-lg hover:text-yellow-300 transition-colors"
        to="/about"
        >About</router-link
      >
    </div>
  </div>
  <div class="text-black" id="search">
    <PokemonSearch @search="updatePokemonName" />
    <PokemonDisplay :pokemonName="pokemonName" />
  </div>
  <router-view />
</template>

<script>
import PokemonSearch from "./components/PokemonSearch.vue";
import PokemonDisplay from "./components/PokemonDisplay.vue";

export default {
  components: {
    PokemonSearch,
    PokemonDisplay,
  },
  data() {
    return {
      pokemonName: "",
    };
  },
  methods: {
    updatePokemonName(newPokemonName) {
      this.pokemonName = newPokemonName;
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  text-decoration: underline;
}
</style>
