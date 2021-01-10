<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="color">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="$emit('close-notification')"
        >Zamknij</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    timeout: { type: Number, default: 5000 },
    show: { type: Boolean, required: true },
    text: { type: String, default: "" },
    color: { type: String, default: "normal" }
    // btnColor: { type: String, default: "blue" }
  }
};
</script>
