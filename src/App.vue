<template>
  <NavBar/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto px-0">
        <div id="sidebar" class="collapse collapse-horizontal show border-end">
          <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
            <router-link v-for="NavItem in availableMenuItems" :key="NavItem.key" :to={path:NavItem.route} class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i :class="NavItem.icon"></i> <span>{{ this.$t(NavItem.message) }}</span></router-link>
          </div>
        </div>
      </div>
<!--      <main class="col ps-md-2 pt-2">-->
<!--      <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</a>-->
<!--      <component v-bind:is="currentMainView" />-->
      <router-view></router-view>
<!--      </main>-->
    </div>
  </div>
</template>

<script>

import NavBar from "@/components/navbar";
import {userInfo} from "@/userInfo";
import {login} from "@/api";

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {

  },
  created() {
    if(userInfo.plopenr === null){
      if(localStorage.AccessKey){
        login.getSetUserInfo(localStorage.AccessKey)

      }
    }
  },
  computed: {
    availableMenuItems(){
      const menuLinks = []
      if(userInfo.plopenr){
        for (let item of this.menuLinks){
          if(item.adminLevel <= userInfo.accessLevel){
            menuLinks.push(item)
          }
        }
      }else{
        for (let item of this.menuLinks){
          if(item.adminLevel === 0){
            menuLinks.push(item)
          }
        }
      }
      return menuLinks
    }
  },
  data() {
    return {
      userInfo,
      currentMainView: "MainView",
      menuLinks: [
        {
          id: 'home',
          message: "nav.home",
          route: "/",
          icon: "bi bi-house",
          key: 0,
          adminLevel: 0
        },
        {
          id: 'navUserInfo',
          message: "nav.userinfo",
          route: "/UserInfo",
          icon: "bi bi-person-circle",
          key: 1,
          adminLevel: 0
        },
        {
          id: 'navAllCourses',
          message: "nav.allCourses",
          route: "/AllCourses",
          icon: "bi bi-stack-overflow",
          key: 2,
          adminLevel: 0
        },
        {
          id: 'testAdminLink',
          message: "nav.allCourses",
          route: "/AllCourses",
          icon: "bi bi-stack-overflow",
          key: 3,
          adminLevel: 1
        },
      ]
    }
  }
}
</script>

<style>
#sidebar-nav {
  width: 160px;
}
</style>
