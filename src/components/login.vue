<template >
  <div class="container" v-if="AskForMagicLink">
    <form class="form-control">
      <label> {{ this.$t("login.magic_link") }}
        <input type="text" v-model="email">
      </label>
      <button @click="orderLink">Send</button>
      <label> {{ this.$t("login.have_token") }}
        <input type="checkbox" @input="skipOrder">
      </label>

    </form>

  </div>
  <div class="container" v-else>
    <form class="form-control">
      <label> {{ this.$t("login.token") }}
        <input type="text"
               v-model="MagicLink"
               >
      </label>
      <button @click="checkMagicLink">Send</button>
      <label> {{ this.$t("login.have_token") }}
        <input type="checkbox" @input="skipOrder" checked>
      </label>
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
      AskForMagicLink: true,
      UserRole: null,
      email: null
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
    skipOrder: function(){
      this.AskForMagicLink = !this.AskForMagicLink
    },
    checkMagicLink: function(event){
      event.preventDefault()
      login.exchangeLinkForKey(this.MagicLink)
          .then(response => {
            console.log(response)
            this.AccessKey = response[1].login_token
            this.checkApiKey(this.AccessKey)
          })

    },
    orderLink: function(event){
      event.preventDefault()
      login.orderMagicLink(this.email)
          .then(result => {
            console.log(result)
            this.AskForMagicLink = false
          })
          .catch(err => {
            console.log(err)
          })
    },
    checkApiKey(key){
      console.log(key)
      login.checkApiKey(key)
    }
  }
}
</script>

<style scoped>

</style>