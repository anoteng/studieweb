<template>

</template>

<script>
import { login } from "api.js"
export default {
  name: "Login",
  data() {
    return {
      loggedInStatus: null,
      userId: null,
      AccessKey: null,
      MagicLink: null,
      UserRole: null
    }
  },
  methods: {
    checkLoggedInState(){
      if(localStorage.apikey){
        login.checkApiKey(localStorage.apikey)
      }else{
        return false
      }
    },
    checkApiKey(key){

    }
  }
}
</script>

<style scoped>

</style>