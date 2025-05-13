import BoardPage from "@/pages/BoardPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import BoardListPage from "@/pages/BoardListPage.vue";
import BoardLayout from "@/pages/BoardLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import AuthPage from "@/pages/AuthPage.vue";
import store from "@/store";
import StartPage from "@/pages/StartPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: StartPage,
    },
    {
        path: "/login",
        name: "Login",
        component: AuthPage,
    },
    {
        path: "/boards",
        component: BoardLayout,
        meta: {requiresAuth: true},
        children: [
            {path: "", name: "BoardList", component: BoardListPage},
            {path: ":id", name: "BoardItem", component: BoardPage},
        ],
    },
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(process.env.BASE_URL),
});

// router.beforeEach((to, from, next) => {
//     const isAuth = store.getters.isAuth;
//     if (to.meta.requiresAuth && !isAuth) {
//         next({name: "Login"});
//     } else {
//         next();
//     }
// });

export default router;