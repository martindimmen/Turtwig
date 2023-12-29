<template>
  <div v-if="pokemon" class="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">
      {{ capitalizedPokemonName }}
    </h2>
    <img
      :src="pokemon.sprites.front_default"
      :alt="capitalizedPokemonName"
      class="w-64 h-64 mx-auto"
    />
    <div class="text-center text-gray-700 mt-4">
      <p class="mb-2">Height: {{ pokemon.height }}</p>
      <p class="mb-2">Weight: {{ pokemon.weight }}</p>
      <p class="mb-4">
        Type:
        <span v-for="type in pokemon.types" :key="type.slot" class="inline-block ml-2">
          {{ type.type.name }}
          <span v-if="type !== pokemon.types[pokemon.types.length - 1]">, </span>
        </span>
      </p>
      <div v-if="pokemon.stats" class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Stats:</h3>
        <pokemon-stats-chart :stats="pokemon.stats"></pokemon-stats-chart>
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
    pokemonName: String,  // Accepts 'pokemonName' as a prop from parent component
  },
  data() {
    return {
      pokemon: null,  // Initializes 'pokemon' data to null
    };
  },
  computed: {
    capitalizedPokemonName() {
      // Returns the Pokemon name capitalized, if it exists
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
    // Fetches Pokemon data, debounced to limit rapid API calls
    fetchPokemon: debounce(async function (newPokemonName) {
      if (newPokemonName) {
        try {
          // Makes a request to the Pokemon API
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${newPokemonName.toLowerCase()}`
          );
          this.pokemon = response.data;  // Sets the fetched data to 'pokemon'
        } catch (error) {
          // Handles errors, setting 'pokemon' to null if not found
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
    // Watches for changes in 'pokemonName' and calls 'fetchPokemon'
    pokemonName(newPokemonName) {
      this.fetchPokemon(newPokemonName);
    },
  },
};
</script>