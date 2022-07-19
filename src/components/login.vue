<template v-if="MagicLink = null">
  <div class="container">
    <form class="form-control">
      <label> {{ this.$t("login.magic_link") }}
        <input type="text">
      </label>
      <button @click="orderLink">Send</button>
    </form>

  </div>
</template>

<script>
import { login } from "../api.js"
export default {
  name: "LoginComp",
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
    orderLink: function(event){
      event.preventDefault()
      console.log(event.target.form[0].value)
      login.orderMagicLink(event.target.form[0].value)
    },
    checkApiKey(key){
      console.log(key)
    }
  }
}
</script>

<style scoped>

</style>