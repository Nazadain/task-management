<script setup lang="ts">

import {Board, RootState, User} from "@/types";
import {useStore} from "vuex";
import {computed} from "vue";
import SidebarUser from "@/components/navbar/sidebar/SidebarUser.vue";
import SidebarSearch from "@/components/navbar/sidebar/SidebarSearch.vue";
import SidebarNav from "@/components/navbar/sidebar/SidebarNav.vue";
import {useRoute} from "vue-router";

const store = useStore<RootState>();
const router = useRoute();

const user = computed<User | null>(() => store.getters["user"]);
const boards = computed<Board[] | []>(() => store.getters["board/boards"]);
const path = computed(() => router.path);

</script>

<template>
  <div class="sidebar__content" v-if="boards.length">
    <sidebar-user
        :user="user"
    />
    <sidebar-search />
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