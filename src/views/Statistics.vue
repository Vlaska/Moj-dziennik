<template>
  <div>
    <div class="d-flex justify-center mt-10">
      <p class="display-2">Statystyki ocen klasy: {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}</p>

    </div>
    <statistics></statistics>
  </div>
</template>

<script>
import Statistics from "@/components/Statistics";

export default {
  components: {
    Statistics
  }
};
</script>

<style scoped>

</style>