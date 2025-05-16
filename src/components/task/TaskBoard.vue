<script setup lang="ts">

import TaskColumn from "@/components/task/TaskColumn.vue";
import {computed, ref} from "vue";
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

const emit = defineEmits([
  "movePanel",
]);

const store = useStore<RootState>();
const isFormOpen = ref<boolean>(false);
const isDragDisabled = computed(() => window.innerWidth < 768);
const tasks = computed(() => store.getters["task/tasks"]);

const setNeighbours = async (evt: any) => {
  try {
    const newIndex: number = evt.newIndex;
    const movedPanel: Panel = props.panels[newIndex];

    const before: Panel = props.panels[newIndex - 1] ?? null;
    const after: Panel = props.panels[newIndex + 1] ?? null;

    const neighbours = {
      before: before ? before.id : null,
      after: after ? after.id : null,
    }

    const response = await api.put(`/api/panels/${movedPanel.id}`, neighbours);
    const data = await response.data;

    store.commit("panel/updatePanelPosition", {
      id: movedPanel.id,
      position: data.position
    });
    const sortedPanels = [...props.panels].sort((a, b) =>
        a.position - b.position);
    store.commit("panel/reorderPanels", sortedPanels);

  } catch (e: any) {
    console.error(e);
  }
}

const openSidebar = (content: Content): void => {
  content.parentId = props.board.id;
  store.commit("sidebar/show", {content: content});
}
const addTask = async (newTask: Task): Promise<void> => {
  try {
    const resp = await api.post(`/api/panels/${newTask.panel_id}`, newTask);
    const data = await resp.data;

    newTask.id = data.id;
    newTask.position = data.position;

    store.commit("task/addTask", newTask);
  } catch (e) {
    console.error(e);
  }
}
const updateTask = (newTask: Task): void => {
  store.commit("task/updateTask", newTask);
}
const updateTasksOrder = async ({id, newTasks, payload}: any): Promise<void> => {
  try {
    const response = await api.put(`/api/tasks/${id}`, payload);
    const updatedTask = response.data;

    const updatedTasks = newTasks.map((task: Task, index: number) => {
      if (task.id === id) {
        return {
          ...task,
          position: updatedTask.position,
          panel_id: payload.panel_id,
        };
      }
      return task;
    });
    updatedTasks.sort((t1: Task, t2: Task) => t1.position - t2.position);

    store.commit("task/reorderTasks", updatedTasks);
  } catch (e: any) {
    console.error(e);
  }
}
const deleteTask = async (id: number): Promise<void> => {
  try {
    store.commit("task/removeTask", id);
    await api.delete(`/api/tasks/${id}`);
  } catch (e) {
    console.error(e);
  }
}
const addPanel = async (title: string): Promise<void> => {
  try {
    isFormOpen.value = false;

    const newPanel: Panel = {
      id: -1,
      title: title,
      colour: "#71DD37",
      position: 0,
      tasks: [],
    }

    const resp = await api.post(
        `/api/boards/${props.boardId}/panels`,
        newPanel,
        {
          headers: {"Authorization": `Bearer ${Cookies.get("token")}`}
        });
    const data = await resp.data;

    newPanel.id = data.id;
    newPanel.position = data.position;

    store.commit("panel/addPanel", newPanel);
  } catch (e: any) {
    console.error(e);
  }
}
const deletePanel = async (id: number): Promise<void> => {
  try {
    store.commit("panel/removePanel", id);
    await api.delete(`/api/panels/${id}`);
  } catch (e) {
    console.error(e);
  }
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
        @end="setNeighbours"
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