<template>
  <v-card elevated outlined>
    <v-card-title class="justify-center"
      ><p class="display-1 text--primary">Przedmioty</p></v-card-title
    >
    <v-card-text>
      <v-container>
        <v-row
          v-for="(sub, idx) in subjects"
          v-bind:key="sub.key"
          class="flex-column ml-5"
          v-bind:class="idx !== 0 ? 'mt-10' : 'mt-2'"
        >
          <h2 class="text--primary mb-5 ml-n7">{{ sub.name }}</h2>
          <v-row v-for="i in sub.classes" v-bind:key="i.key" class="my-auto d-flex flex-column pb-4">
            <div class="d-flex align-center" style="max-width: 150px">
              Klasa {{ i.idx }}
            </div>
            <div class="d-flex flex-row class-ids" style="flex-wrap: wrap">
              <v-btn
                v-for="j in i.names"
                v-bind:key="j"
                class="px-0 ma-2"
                rounded
                style="min-width: 36px"
                color="indigo lighten-5"
              >
                {{ j | lower }}
              </v-btn>
            </div>
          </v-row>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Subjects",
  data: () => ({
    // eslint-disable-next-line no-unused-labels
    subjects: [
      {
        name: "Język Polski",
        key: 1,
        classes: [
          {
            idx: "I",
            names: ["a", "b"],
            key: 1
          },
          {
            idx: "III",
            names: ["b", "c"],
            key: 2
          }
        ]
      },
      {
        name: "Informatyka",
        key: 2,
        classes: [
          {
            idx: "I",
            names: ["a", "b", "c", "d", "e", "f"],
            key: 3
          },
          {
            idx: "II",
            names: ["a"],
            key: 4
          },
          {
            idx: "III",
            names: ["a"],
            key: 5
          }
        ]
      }
    ]
  })
};
</script>
