<template>
  <div class="menu">
    <!-- <v-hover v-slot="{ hover }"> -->
    <router-link v-for="item in pages" :key="item.text" :to="item.url">
      <v-card class="menu-item pt-2 pb-1" max-width="170" width="170">
        <img draggable="false" :src="item.image" class="max pt-2 pb-4" />
        <span>{{ item.text }}</span>
      </v-card>
    </router-link>
    <!-- </v-hover> -->
  </div>
</template>

<script>
export default {
  props: {
    pages: Array
  }
};
</script>

<style>
.menu {
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 24px;
  column-gap: 32px;
}

.menu-item,
.menu-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img.max {
  max-width: 150px;
  max-height: 150px;
}
</style>
