import Home from "@/pages/Home.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router