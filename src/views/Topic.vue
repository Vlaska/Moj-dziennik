<template>
  <div>
    <div class="d-flex justify-center mt-10">
      <p class="display-2">Nowa lekcja klasy: {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}</p>

    </div>
    <topic></topic>
  </div>
</template>

<script>
import Topic from "@/components/Topic";

export default {
  components: {
    Topic
  }
};
</script>

<style scoped>

</style>