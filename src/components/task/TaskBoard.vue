<script setup lang="ts">

import TaskColumn from "@/components/task/TaskColumn.vue";
import {computed, onMounted, ref} from "vue";
import {Board, Panel, RootState, Task} from "@/types";
import AddForm from "@/components/UI/AddForm.vue";
import {useStore} from "vuex";
import {Content} from "@/store/drawer";
import {VueDraggableNext} from "vue-draggable-next";
import axios from "axios";

interface Props {
  board: Board;
  panels: Panel[];
}

const props = defineProps<Props>();

defineOptions({
  name: "panel-container",
});

const store = useStore<RootState>();
const tasks = computed(() => store.getters["task/tasks"]);
const isFormOpen = ref<boolean>(false);
const isDragDisabled = computed(() => window.innerWidth < 768);

const onDragChange = () => {
  store.commit("panel/setPanels", props.panels);
}
const openSidebar = (content: Content): void => {
  content.boardId = props.board.id;
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
const addPanel = (title: string): void => {
  const newPanel: Panel = {
    id: Date.now(),
    title: title,
    colour: "#71DD37",
    boardId: props.board.id
  }
  store.commit("panel/addPanel", newPanel);
  isFormOpen.value = false;
}
const deletePanel = (id: number): void => {
  store.commit("panel/removePanel", id);
}
const openForm = (): void => {
  isFormOpen.value = true;
}

onMounted(async () => {

  window.Echo.channel(`board.${props.board.id}`)
      .listen('panel_created', (e: any) => {
        console.log(e);
      });

  const panelsResponse = await axios.get('/panels.json')
  const panels = await panelsResponse.data;
  store.commit("panel/setPanels", panels);

  const tasksResponse = await axios.get('/tasks.json');
  const tasks = await tasksResponse.data;
  store.commit("task/setTasks", tasks);
});

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
          :tasks="tasks.filter((t: Task) => t.panelId === panel.id)"
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