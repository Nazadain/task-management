<script setup lang="ts">

import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {ref} from "vue";
import SidebarContainer from "@/components/navbar/sidebar/SidebarContainer.vue";
import TaskBoardAdd from "@/components/task/TaskBoardAdd.vue";
import api from "@/http/axios";
import Cookies from "js-cookie";

const pageTitle = ref<string>("");
const isTaskBoardAddActive = ref<boolean>(false);

const setTitle = (title: string): void => {
  pageTitle.value = title;
}
const openAddBoard = (): void => {
  isTaskBoardAddActive.value = true;
}
const closeAddBoard = (): void => {
  isTaskBoardAddActive.value = false;
}
const createBoard = async (board: Object): Promise<void> => {
  const response = await api.post("/api/boards", board, {
    headers: {
      "authorization": `Bearer ${Cookies.get("token")}`,
    }
  });
  const json = await response.data;
  console.log(json);
}

</script>

<template>
  <drawer/>
  <div class="boards__container">
    <task-board-add
        v-if="isTaskBoardAddActive"
        @create="createBoard"
        @close="closeAddBoard"
    />
    <sidebar-container/>
    <div class="boards__body">
      <topbar-container
          :name="pageTitle"
          @openAddBoard="openAddBoard"
      />
      <router-view v-slot="{Component}">
        <component
            :is="Component"
            @title="setTitle"
            @openAddBoard="openAddBoard"
        />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.boards__container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  height: 100vh;
}

.boards__container .boards__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
</style>