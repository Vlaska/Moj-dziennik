<template>
  <v-container class="d-flex flex-column" style="width: 100%">
    <div v-for="(i, idx) in options" :key="idx" class="grid">
      <v-btn
        outlined
        elevation="1"
        v-for="j in i"
        :key="j"
        class="grade-btn"
        width="36"
        style="font-size: 20px"
        @click="$emit('option-changed', j)"
        :color="j == currentOption ? 'cyan lighten-4' : 'normal'"
        :class="
          currentOption === j
            ? 'cyan--text text--darken-4'
            : colors
            ? colors[j]
            : ''
        "
        >{{ j }}</v-btn
      >
    </div>
    <div class="grid" v-if="lower_row">
      <v-btn
        outlined
        elevation="1"
        class="grade-btn"
        width="36"
        @click="$emit('option-changed', 'pointer')"
        :color="'pointer' == currentOption ? 'cyan lighten-4' : 'normal'"
        :class="currentOption === 'pointer' ? 'cyan--text text--darken-4' : ''"
        ><v-icon>{{ pointer }}</v-icon></v-btn
      >
      <v-btn
        outlined
        elevation="1"
        class="grade-btn red--text text--accent-4"
        width="36"
        @click="$emit('option-changed', 'trash')"
        color="red lighten-4"
        ><v-icon>{{ trash }}</v-icon></v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    trash: "far fa-trash-alt",
    pointer: "fas fa-mouse-pointer"
  }),
  props: {
    currentOption: String,
    options: {
      type: Array,
      required: true
    },
    lower_row: {
      type: Boolean,
      default: true
    },
    colors: Object
  }
};
</script>

<style>
.grade-btn {
  min-width: 36px !important;
  max-width: 36px !important;
}

.grid {
  display: grid;
  grid-template-columns: 36px 36px 36px 36px;
  grid-gap: 0.5em;
}

.grid:not(:last-child) {
  padding-bottom: 0.5em;
}

.grade-selector {
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>
