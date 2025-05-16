<script setup lang="ts">

import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {onBeforeMount, ref} from "vue";
import SidebarContainer from "@/components/navbar/sidebar/SidebarContainer.vue";
import TaskBoardAdd from "@/components/task/modal/TaskBoardAdd.vue";
import api from "@/http/axios";
import Cookies from "js-cookie";
import {Board, RootState} from "@/types";
import {useStore} from "vuex";
import TaskBoardEdit from "@/components/task/modal/TaskBoardEdit.vue";
import {useRoute} from "vue-router";

const store = useStore<RootState>();
const route = useRoute();

const pageTitle = ref<string>("");
const isTaskBoardAddActive = ref<boolean>(false);
const isTaskBoardEditActive = ref<boolean>(false);

const setTitle = (title: string): void => {
  pageTitle.value = title;
}
const openAddBoard = (): void => {
  isTaskBoardAddActive.value = true;
}
const closeAddBoard = (): void => {
  isTaskBoardAddActive.value = false;
}
const openEditBoard = (): void => {
  isTaskBoardEditActive.value = true;
}
const closeEditBoard = (): void => {
  isTaskBoardEditActive.value = false;
}
const createBoard = async (board: Board): Promise<void> => {
  const response = await api.post("/api/boards", board, {
    headers: {
      "authorization": `Bearer ${Cookies.get("token")}`,
    }
  });
  const json = await response.data;

  const newBoard: Board = {
    id: json.id,
    title: json.title,
    description: json.description,
    is_private: json.is_private,
    role: json.role,
    panels: []
  }

  store.commit("board/addBoard", newBoard);
  closeAddBoard();
}
const editBoard = async (board: Board): Promise<void> => {
  board.id = Number(route.params.id);
  await api.patch(`/api/boards/${board.id}`, board, {
    headers: {"Authorization": `Bearer ${Cookies.get("token")}`}
  });
}

onBeforeMount(async () => {
  const response = await api.get("/api/boards", {
    headers: {
      "authorization": `Bearer ${Cookies.get("token")}`,
    }
  });
  const json = await response.data;
  for (const board of json) {
    const newBoard: Board = {
      id: board.id,
      title: board.title,
      description: board.description,
      is_private: board.is_private,
      role: board.role,
      panels: []
    }
    store.commit("board/addBoard", newBoard);
  }
});

</script>

<template>
  <drawer/>
  <div class="boards__container">
    <task-board-add
        v-if="isTaskBoardAddActive"
        @create="createBoard"
        @close="closeAddBoard"
    />
    <task-board-edit
        v-if="isTaskBoardEditActive"
        @edit="editBoard"
        @close="closeEditBoard"
    />
    <sidebar-container/>
    <div class="boards__body">
      <topbar-container
          :name="pageTitle"
          @openAddBoard="openAddBoard"
          @openEditBoard="openEditBoard"
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