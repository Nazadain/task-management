import BoardPage from "@/pages/BoardPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import BoardListPage from "@/pages/BoardListPage.vue";
import BoardLayout from "@/pages/BoardLayout.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/boards",
    component: BoardLayout,
    children: [
      {path: "", name: "BoardList", component: BoardListPage},
      {path: ":id", name: "BoardItem", component: BoardPage},
    ]
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHistory(process.env.BASE_URL),
})

export default router