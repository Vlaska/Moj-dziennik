<template>
  <v-container>
    <title-of-page>
      <p class="display-2">Statystyki ocen klasy</p>
      <p class="display-1">
        {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p>
    </title-of-page>
    <statistics></statistics>
  </v-container>
</template>

<script>
import Statistics from "@/components/Statistics";
import TitleOfPage from "@/components/TitleOfPage.vue";

export default {
  components: {
    Statistics,
    TitleOfPage
  }
};
</script>
