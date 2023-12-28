<template>
  <div
    id="nav"
    class="p-5 bg-gradient-to-r from-blue-800 to-purple-600 text-white flex justify-between items-center shadow-md"
  >
    <div class="space-x-4">
      <router-link
        class="text-white text-lg hover:text-yellow-300 transition-colors px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
        to="/"
        >Home</router-link
      >
      <router-link
        class="text-white text-lg hover:text-yellow-300 transition-colors px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
        to="/about"
        >About</router-link
      >
    </div>
  </div>
  <div
    class="text-black w-full py-10 grid place-items-center"
    id="search"
  >
    <div class="max-w-md w-full space-y-8">
      <PokemonSearch @search="updatePokemonName" />
      <PokemonDisplay :pokemonName="pokemonName" />
    </div>
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
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem; /* 6px */
}


</style>
