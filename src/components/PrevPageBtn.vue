<template>
  <div style="position: relative">
    <div style="position: absolute; top: 50px">
      <router-link :to="prevPage().link"
        ><v-btn color="indigo" dark>Powrót</v-btn></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    prevPage() {
      return this.$store.state.prevPage;
    }
  }
};
</script>
