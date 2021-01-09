<template>
  <v-container>
    <v-row>
      <prev-page-btn />
      <div
        class="d-flex mt-10 mb-5 flex-column justify-center align-center"
        style="width: 100%"
      >
        <p class="display-2">Uwagi</p>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import PrevPageBtn from "@/components/PrevPageBtn";
export default {
  components: {
    PrevPageBtn
  }
};
</script>

<style>
</style>
