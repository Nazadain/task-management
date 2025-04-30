import {createStore} from "vuex";
import sidebar from "@/store/sidebar";
import task from "@/store/tasks";

export default createStore({
    modules: {
        sidebar,
        task
    }
})