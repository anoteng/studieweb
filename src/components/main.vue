<template >
  <main class="col ps-md-2 pt-2">
    <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i>{{ this.$t("nav.menu") }}</a>
    <div class="page-header pt-3">
      <h2>Bootstrap 5 Sidebar Menu - Simple</h2>
    </div>
    <p class="lead">A offcanvas "push" vertical nav menu example.</p>
    <hr>
    <div class="row">
      <div class="container" v-if="this.loggedIn">
        {{ this.$t("message.hello") }}

      </div>
      <LoginComp v-else></LoginComp>
    </div>
  </main>


</template>
<script>

import {login} from "@/api"
import LoginComp from "./login"
export default {
  name: "MainView",
  components: {LoginComp},
  data() {
    return{
      loggedIn: false
    }
  },
  methods: {
    checkLoggedInState(){
      if(localStorage.AccessKey){
        login.checkApiKey(localStorage.AccessKey)
            .then(result => {
              console.log(result)
              this.loggedIn = true
            })
      }else{
        return false
      }
    }
  },
  created() {
    this.checkLoggedInState()
  }
}

</script>

<style scoped>

</style>