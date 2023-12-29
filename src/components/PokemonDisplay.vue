<template>
  <div v-if="pokemon" class="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
      {{ capitalizedPokemonName }}
    </h2>
    <img
      :src="pokemon.sprites.front_default"
      :alt="capitalizedPokemonName"
      class="w-64 h-64 mx-auto rounded-full border-4 border-gray-300 dark:border-gray-600"
    />
    <div class="text-center text-gray-800 dark:text-gray-300 mt-6">
      <p class="mb-4">Height: {{ pokemon.height }}</p>
      <p class="mb-4">Weight: {{ pokemon.weight }}</p>
      <p class="mb-4">
        Type:
        <span v-for="type in pokemon.types" :key="type.slot" class="inline-block ml-2 font-medium text-indigo-600 dark:text-indigo-400">
          {{ type.type.name }}
          <span v-if="type !== pokemon.types[pokemon.types.length - 1]">, </span>
        </span>
      </p>
      <div v-if="pokemon.stats" class="mt-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Stats:</h3>
        <pokemon-stats-chart :key="pokemonName" :stats="pokemon.stats"></pokemon-stats-chart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";
import PokemonStatsChart from './PokemonStatsChart.vue';

export default {
  components:{
    PokemonStatsChart,
  },
  props: {
    pokemonName: String,
  },
  data() {
    return {
      pokemon: null,
    };
  },
  computed: {
    capitalizedPokemonName() {
      if (this.pokemon && this.pokemon.name) {
        return (
          this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1)
        );
      } else {
        return "";
      }
    },
  },
  methods: {
    fetchPokemon: debounce(async function (newPokemonName) {
      if (newPokemonName) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${newPokemonName.toLowerCase()}`
          );
          this.pokemon = response.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Pokemon not found");
            this.pokemon = null;
          } else {
            console.error(error);
          }
        }
      } else {
        this.pokemon = null;
      }
    }, 500),
  },
  watch: {
    pokemonName(newPokemonName) {
      this.fetchPokemon(newPokemonName);
    },
  },
};
</script>
