import BoardPage from "@/pages/BoardPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import BoardListPage from "@/pages/BoardListPage.vue";
import BoardLayout from "@/pages/BoardLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import AuthLayout from "@/pages/AuthLayout.vue";
import store from "@/store";
import StartPage from "@/pages/StartPage.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import {watch} from "vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: StartPage,
    },
    {
       path: "/login",
       name: "Login",
       component: AuthLayout,
    },
    {
        path: "/register",
        name: "Register",
        component: AuthLayout,
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

router.beforeEach((to, from, next) => {
    const authLoading = () => store.getters["authLoading"];
    const isAuth = () => store.getters["isAuth"];

    if (authLoading()) {
        const stop = watch(authLoading, (loading) => {
            if (!loading) {
                stop();
                handleAuthCheck();
            }
        });
    } else {
        handleAuthCheck();
    }

    function handleAuthCheck() {
        if (to.meta.requiresAuth && !isAuth()) {
            next('/login');
        } else {
            next();
        }
    }
});



export default router;