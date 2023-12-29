<template>
  <div>
    <input
      type="text"
      v-model="pokemonName"
      placeholder="Search for Pokemon"
    />
    <button @click="searchPokemon">Search</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pokemonName: "",
    };
  },
  methods: {
    emitPokemonName() {
      this.$emit("search", this.pokemonName);
    },
    searchPokemon() {
      this.$emit("search", this.pokemonName);
    },
  },
};
</script>
