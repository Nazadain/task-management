<script setup lang="ts">

import TaskColumn from "@/components/task/TaskColumn.vue";
import {computed, onMounted, ref} from "vue";
import {Board, Panel, RootState, Task} from "@/types";
import AddForm from "@/components/UI/AddForm.vue";
import {useStore} from "vuex";
import {Content} from "@/store/drawer";
import {VueDraggableNext} from "vue-draggable-next";
import api from "@/http/axios";
import Cookies from "js-cookie";

interface Props {
  boardId: number;
  board: Board;
  panels: Panel[];
}

const props = defineProps<Props>();

defineOptions({
  name: "panel-container",
});

const store = useStore<RootState>();
const isFormOpen = ref<boolean>(false);
const isDragDisabled = computed(() => window.innerWidth < 768);
const tasks = computed(() => store.getters["task/tasks"]);

// const onDragChange = () => {
//   store.commit("panel/setPanels", props.panels);
// }
const openSidebar = (content: Content): void => {
  content.parentId = props.board.id;
  store.commit("sidebar/show", {content: content});
}
const addTask = (newTask: Task): void => {
  store.commit("task/addTask", newTask);
}
const updateTask = (newTask: Task): void => {
  store.commit("task/updateTask", newTask);
}
const updateTasksOrder = (newTasks: Task[]): void => {
  store.commit("task/reorderTasks", newTasks);
}
const deleteTask = (id: number): void => {
  store.commit("task/removeTask", id);
}
const addPanel = async (title: string): Promise<void> => {
  try {
    const newPanel: Panel = {
      id: -1,
      title: title,
      colour: "#71DD37",
      position: 0,
      tasks: [],
    }

    const resp = await api.post(`/api/boards/${props.boardId}/panels`, newPanel, {
      headers: {"Authorization": `Bearer ${Cookies.get("token")}`}
    });
    const data = await resp.data;

    newPanel.id = data.id;
    newPanel.position = data.position;

    store.commit("panel/addPanel", newPanel);

    isFormOpen.value = false;
  } catch (e: any) {
    console.error(e);
  }
}
const deletePanel = (id: number): void => {
  store.commit("panel/removePanel", id);
}
const openForm = (): void => {
  isFormOpen.value = true;
}

</script>

<template>
  <div class="board-list__container">
    <VueDraggableNext
        v-if="panels.length > 0"
        class="board-list__container"
        :list="panels"
        :disabled="isDragDisabled"
        group="panels"
        @change="onDragChange"
    >
      <task-column
          v-for="panel in panels"
          :panel="panel"
          :tasks="tasks"
          @openSidebar="openSidebar"
          @addTask="addTask"
          @updateTask="updateTask"
          @updateTasksOrder="updateTasksOrder"
          @deleteTask="deleteTask"
          @deletePanel="deletePanel"
          :key="panel.id"
      />
    </VueDraggableNext>
    <div class="add_panel">
      <add-form
          :show="isFormOpen"
          placeholder="Название колонки"
          @add="addPanel"
          @openForm="openForm"
      >
        Добавить колонку
      </add-form>
    </div>
  </div>
</template>

<style scoped>
.board-list__container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  text-align: left;
  gap: 25px;
  min-width: max-content;
  padding: 10px 20px;
}

.add_panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 25px;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .board-list__container {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    min-width: auto;
  }
}
</style>