import {createStore} from "vuex";
import sidebar from "@/store/drawer";
import task from "@/store/tasks";
import panel from "@/store/panels";
import auth from "@/store/auth";

export default createStore({
    modules: {
        sidebar,
        task,
        panel,
        auth,
    }
})