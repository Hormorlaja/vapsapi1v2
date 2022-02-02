<template>
  <div id="app">
    <side-bar></side-bar>
    <router-view/>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue"
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default {
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
@import './assets/styles/font.css';
@import './assets/styles/global.scss';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: 'Apercu Pro Regular';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>