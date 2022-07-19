<template >
  <div class="container" v-if="checkLoggedInState()">
    {{ this.$t("message.hello") }}

  </div>
  <LoginComp v-else></LoginComp>
</template>
<script>

import {login} from "../api.js"
import LoginComp from "./login"
export default {
  name: "MainView",
  components: {LoginComp},
  methods: {
    checkLoggedInState(){
      if(localStorage.apikey){
        login.checkApiKey(localStorage.apikey)
      }else{
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>