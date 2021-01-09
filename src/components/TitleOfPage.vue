<template>
  <v-row>
    <prev-page-btn v-if="prevBtn" />
    <div
      class="d-flex mt-10 mb-5 flex-column justify-center align-center"
      style="width: 100%"
    >
      <slot>
        <p class="display-2">{{ title }}</p>
      </slot>
    </div>
  </v-row>
</template>

<script>
import PrevPageBtn from "@/components/PrevPageBtn.vue";

export default {
  props: {
    prevBtn: { type: Boolean, default: true },
    title: { type: String, default: "" }
  },
  components: {
    PrevPageBtn
  }
};
</script>
