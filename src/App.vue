<template>
  <NavBar/>
  <MainView/>
</template>

<script>
import MainView from './components/main.vue'
import NavBar from "@/components/navbar";


export default {
  name: 'App',
  components: {
    MainView,
    NavBar
  }
}
</script>

<style>

</style>
