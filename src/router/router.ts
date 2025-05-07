import BoardPage from "@/pages/BoardPage.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: BoardPage
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(process.env.BASE_URL),
})

export default router