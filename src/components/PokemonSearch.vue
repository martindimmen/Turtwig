<template>
  <div>
    <input
      type="text"
      v-model="pokemonName"
      @input="emitPokemonName"
      placeholder="Search for Pokemon"
    />
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
  },
};
</script>
