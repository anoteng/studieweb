<template >
  <div class="d-inline-flex p-2 bd-highlight" v-if="AskForMagicLink">
    <form class="row g-3">
      <label class="form-label"> {{ this.$t("login.magic_link") }}
        <input type="email" v-model="email">
      </label>

      <label class="form-check-label"> {{ this.$t("login.have_token") }}
        <input type="checkbox" @input="skipOrder">
      </label>
      <button @click="orderLink" class="btn btn-secondary">Send</button>

    </form>

  </div>
  <div class="d-inline-flex p-2 bd-highlight" v-else>
    <form class="row g-3">
      <label class="form-label"> {{ this.$t("login.token") }}
        <input type="text"
               v-model="MagicLink"
               >
      </label>

      <label class="form-check-label"> {{ this.$t("login.have_token") }}
        <input type="checkbox" @input="skipOrder" checked>
      </label>
      <button @click="checkMagicLink" class="btn btn-secondary">Send</button>
    </form>
  </div>
</template>

<script>
import { login } from "@/api"
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
        const result = login.checkApiKey(localStorage.apikey)
        if (result.length > 0){
          return true
        }else{
          return false
        }
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
            localStorage.setItem('AccessKey', this.AccessKey)
            this.checkApiKey(this.AccessKey)
            this.getSetUserInfo()
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
    getSetUserInfo(){
      login.getSetUserInfo(this.AccessKey)
          .then(data => {
            const user = data[0]
            let accessLevel = 0
            if(user.allow_login){
              accessLevel = 1
            }
            this.$root.userInfo = {
              plopenr: user.plopenr,
              last_name: user.last_name,
              first_name: user.first_name,
              email: user.email,
              accessLevel: accessLevel
            }
          })
          .then(() =>{
            const result = login.checkAdminLevel(this.$root.userInfo.plopenr)
            console.log(result)
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