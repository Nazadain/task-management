import {createApp, DefineComponent} from "vue";
import App from "@/App.vue";
import router from "@/router/router";
import components from "@/components/UI";
import store from "@/store";

const app = createApp(App)

components.forEach((component: DefineComponent): void => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(store)
    .mount('#app')
