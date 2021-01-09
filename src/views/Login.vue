<template>
  <div>
    <title-of-page :prevBtn="false" title="Logowanie"/>
    <login></login>
  </div>
</template>

<script>
import Login from "@/components/Login";
import TitleOfPage from '../components/TitleOfPage.vue';

export default {
  components: {
    Login,
    TitleOfPage
  }
};
</script>
