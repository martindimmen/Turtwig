<template>
  <!-- Checks if the Pokemon variable has a value; if it does, the div gets rendered -->
  <div v-if="pokemon">
    <h2>{{ capitalizedPokemonName }}</h2>
    <img
      :src="pokemon.sprites.front_default"
      :alt="capitalizedPokemonName"
      class="w-64 h-64"
    />
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
    <p>
      Type:
      <span v-for="type in pokemon.types" :key="type.slot">
        {{ type.type.name }}
        //Checks if types are equal, if not add comma
        <span v-if="type !== pokemon.types[pokemon.types.length - 1]">, </span>
      </span>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";

export default {
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
