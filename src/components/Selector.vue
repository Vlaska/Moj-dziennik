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
          current_option !== 'trash'
            ? 'cyan--text text--darken-4'
            : 'red--text text--accent-4'
        "
        large
        content="Naciśnij mnie, aby zresetować aktualnie wybraną ocenę."
        v-tippy="{
          animateFill: false,
          animation: 'shift-away',
          placement: 'top-end',
          theme: 'dark',
          arrow: true
        }"
        :delay="[400, 0]"
        @click="resetCurrentGrade"
        :color="current_option !== 'trash' ? 'cyan lighten-4' : 'red lighten-4'"
      >
        <span v-if="current_option == 'pointer'"
          ><v-icon>{{ pointer }}</v-icon></span
        >
        <span v-else-if="current_option == 'trash'"
          ><v-icon>{{ trash }}</v-icon></span
        >
        <span v-else>
          {{ current_option }}
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
                @click="setCurrentGrade(j)"
                :color="j == current_option ? 'cyan lighten-4' : 'normal'"
                :class="
                  current_option === j
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
                @click="setCurrentGrade('pointer')"
                :color="
                  'pointer' == current_option ? 'cyan lighten-4' : 'normal'
                "
                :class="
                  current_option === 'pointer'
                    ? 'cyan--text text--darken-4'
                    : ''
                "
                ><v-icon>{{ pointer }}</v-icon></v-btn
              >
              <v-btn
                outlined
                elevation="1"
                class="grade-btn red--text text--accent-4"
                width="36"
                @click="setCurrentGrade('trash')"
                color="red lighten-4"
                ><v-icon>{{ trash }}</v-icon></v-btn
              >
            </div>
          </v-container>
        </v-sheet>
      </v-menu>
    </div>
  </v-container>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    current_option: "pointer",
    trash: "far fa-trash-alt",
    pointer: "fas fa-mouse-pointer"
  }),
  props: {
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
  watch: {
    current_option: function (val) {
      this.$emit("option-changed", val);
    }
  },
  methods: {
    setCurrentGrade(option) {
      this.current_option = option;
    },
    resetCurrentGrade() {
      this.current_option = "pointer";
    }
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
