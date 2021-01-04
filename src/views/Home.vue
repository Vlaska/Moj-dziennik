<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="d-flex flex-column justify-center align-center mt-10">
      <router-link :to="{ name: 'login' }">Logowanie</router-link>
      <router-link :to="{ name: 'mainPage' }">Strona główna</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home"
  // components: {
  //   HelloWorld
  // }
};
</script>
