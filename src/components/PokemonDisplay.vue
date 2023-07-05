<template>
  <!-- Checks i Pokemon variable has a value, if it does the div gets rendered -->
  <div v-if="pokemon">
    <h2>{{ capitalizedPokemonName }}</h2>
    <img
      :src="pokemon.sprites.front_default"
      :alt="capitalizedPokemonName"
      class="w-64 h-64"
    />
    <p>Height: {{ pokemon.height }}</p>
    <p>Weight: {{ pokemon.weight }}</p>
  </div>
</template>

<script>
import axios from "axios";

//Export default object, which is the whole component
export default {
  props: {
    //Prop is used to pass data from a parent to child component
    pokemonName: String,
  },
  data() {
    //Returns an object that contains the reactive data for this component.
    return {
      pokemon: null,
    };
  },
  //Defines computed properties for the component.Checks if this.pokemon exists and has name, if it does capitalize it.
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
  watch: {
    //Watches if pokemonname changes, if changes HTTP request to PokeAPI
    async pokemonName(newPokemonName) {
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
    },
  },
};
</script>
