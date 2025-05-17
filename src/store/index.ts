import {createStore} from "vuex";
import sidebar from "@/store/drawer";
import task from "@/store/tasks";
import panel from "@/store/panels";
import auth from "@/store/auth";
import board from "@/store/boards";
import users from "@/store/users";

export default createStore({
    modules: {
        sidebar,
        task,
        panel,
        auth,
        board,
        users
    }
})