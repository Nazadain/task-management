<script setup lang="ts">

import {Board, RootState, User} from "@/types";
import {useStore} from "vuex";
import {computed, onBeforeMount} from "vue";
import SidebarUser from "@/components/navbar/sidebar/SidebarUser.vue";
import SidebarSearch from "@/components/navbar/sidebar/SidebarSearch.vue";
import SidebarNav from "@/components/navbar/sidebar/SidebarNav.vue";
import {useRoute} from "vue-router";
import router from "@/router/router";
import Cookies from "js-cookie";

const store = useStore<RootState>();
const route = useRoute();

const user = computed<User | null>(() => store.getters["user"]);
const boards = computed<Board[] | []>(() => store.getters["board/boards"]);
const path = computed(() => route.path);

const logout = (): void => {
  store.commit("setIsAuth", false);
  store.commit("setUser", null);
  store.commit("board/setBoards", []);
  store.commit("task/setTasks", []);
  store.commit("panel/setPanels", []);

  Cookies.remove("token");

  router.push("/");
}

</script>

<template>
  <div class="sidebar__content">
    <sidebar-user
        :user="user"
        @logout="logout"
    />
    <sidebar-search/>
    <sidebar-nav
        :path="path"
        :boards="boards"
    />
  </div>
</template>

<style scoped>
.sidebar__content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>