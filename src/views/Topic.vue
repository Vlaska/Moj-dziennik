<template>
  <v-container>
    <title-of-page
      ><p class="display-2">Nowa lekcja klasy</p>
      <p class="display-1">
        {{ class_name($route.params.class_name) }} &mdash;
        {{ subject_codes[$route.params.subject] }}
      </p></title-of-page
    >
    <topic></topic>
  </v-container>
</template>

<script>
import Topic from "@/components/Topic";
import TitleOfPage from '@/components/TitleOfPage.vue';

export default {
  components: {
    Topic,
    TitleOfPage
  }
};
</script>
