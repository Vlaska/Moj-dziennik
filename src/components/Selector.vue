<template>
  <v-container>
    <div class="grade-selector">
      <v-btn
        min-width="44"
        width="44"
        outlined
        elevation="1"
        class="mr-3"
        style="font-size: 20px"
        :class="
          currentOption !== 'trash'
            ? 'cyan--text text--darken-4'
            : 'red--text text--accent-4'
        "
        large
        content="Naciśnij mnie lub prawy przycisk myszy (PPM), aby zresetować aktualnie wybraną ocenę."
        v-tippy="{
          animateFill: false,
          animation: 'shift-away',
          placement: 'top-end',
          theme: 'dark',
          arrow: true
        }"
        :delay="[400, 0]"
        @click="resetCurrentGrade"
        :color="currentOption !== 'trash' ? 'cyan lighten-4' : 'red lighten-4'"
      >
        <span v-if="currentOption == 'pointer'"
          ><v-icon>{{ pointer }}</v-icon></span
        >
        <span v-else-if="currentOption == 'trash'"
          ><v-icon>{{ trash }}</v-icon></span
        >
        <span v-else>
          {{ currentOption }}
        </span>
      </v-btn>
      <v-menu
        offset-y
        top
        left
        open-on-hover
        :close-on-click="false"
        :close-on-content-click="false"
        :close-delay="200"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="success" v-bind="attrs" v-on="on" large>{{
            name
          }}</v-btn>
        </template>
        <v-sheet
          max-width="fit-content"
          outlined
          rounded
          color="indigo lighten-5"
        >
          <selector-menu
            :options="options"
            :colors="colors"
            :lower_row="lower_row"
            :current-option="currentOption"
            @option-changed="option_changed"
          />
        </v-sheet>
      </v-menu>
    </div>
  </v-container>
</template>

<script>
import SelectorMenu from "@/components/SelectorMenu";
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
    name: {
      type: String,
      required: true
    },
    lower_row: {
      type: Boolean,
      default: true
    },
    colors: Object
  },
  methods: {
    option_changed(value) {
      this.$emit("option-changed", value);
    },
    resetCurrentGrade() {
      this.option_changed("pointer");
    }
  },
  components: { SelectorMenu }
};
</script>
