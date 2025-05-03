import {createStore} from "vuex";
import sidebar from "@/store/sidebar";
import task from "@/store/tasks";
import panel from "@/store/panels";

export default createStore({
    modules: {
        sidebar,
        task,
        panel
    }
})