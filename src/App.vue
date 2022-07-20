<template>
  <NavBar/>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto px-0">
        <div id="sidebar" class="collapse collapse-horizontal show border-end">
          <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
            <a v-for="NavItem in this.menuLinks" :key="NavItem.key" :id="NavItem.id" href="#" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i :class="NavItem.icon"></i> <span>{{ this.$t(NavItem.message) }}</span></a>
          </div>
        </div>
      </div>
<!--      <main class="col ps-md-2 pt-2">-->
<!--      <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</a>-->
      <component v-bind:is="currentMainView" />
<!--      </main>-->
    </div>
  </div>
</template>

<script>
import MainView from './components/main.vue'
import NavBar from "@/components/navbar";
import AllCourses from "@/components/AllCourses";
import UserInfo from "@/components/UserInfo";


export default {
  name: 'App',
  components: {
    MainView,
    NavBar,
    AllCourses,
    UserInfo
  },
  methods: {
    navLink: function (e) {
      console.log(e.target.id)
    }
  },
  data() {
    return {
      currentMainView: "MainView",
      menuLinks: [
        {
          id: 'navUserInfo',
          message: "nav.userinfo",
          component: UserInfo,
          icon: "bi bi-person-circle",
          key: 1,
          adminLevel: 0
        },
        {
          id: 'navAllCourses',
          message: "nav.allCourses",
          component: AllCourses,
          icon: "bi bi-stack-overflow",
          key: 2,
          adminLevel: 0
        },
        {
          id: 'testAdminLink',
          message: "nav.allCourses",
          component: AllCourses,
          icon: "bi bi-stack-overflow",
          key: 2,
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
