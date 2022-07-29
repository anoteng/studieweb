import {createRouter, createWebHashHistory} from "vue-router"
// import App from "@/App";
import MainView from "@/components/main";
import AllCourses from "@/components/AllCourses";
import UserInfo from "@/components/UserInfo";
const routes = [
    { path: '/', name: 'MainView', component: MainView },
    { path: '/AllCourses', name: 'AllCourses', component: AllCourses },
    { path: '/UserInfo', name: 'UserInfo', component: UserInfo }

]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
export default router