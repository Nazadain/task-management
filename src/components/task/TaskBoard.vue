<script setup lang="ts">

import TaskColumn from "@/components/task/TaskColumn.vue";
import {computed, onMounted, ref} from "vue";
import {Panel, RootState, Task} from "@/types";
import AddForm from "@/components/UI/AddForm.vue";
import {useStore} from "vuex";
import {Content} from "@/store/sidebar";

defineOptions({
  name: "panel-container",
});

const store = useStore<RootState>();

const panels = computed(() => store.getters["panel/panels"]);
const tasks = computed(() => store.getters["task/tasks"]);
const isFormOpen = ref<boolean>(false);

onMounted(async () => {
  const panelsResponse = await fetch('/panels.json')
  const panels = await panelsResponse.json();
  store.commit("panel/setPanels", panels);

  const tasksResponse = await fetch('/tasks.json');
  const tasks = await tasksResponse.json();
  store.commit("task/setTasks", tasks);
});

const openSidebar = (content: Content): void => {
  store.commit("sidebar/show", {content: content});
}
const addTask = (newTask: Task): void => {
  store.commit("task/addTask", newTask);
}
const reorderTasksInColumn = (tasks: Task[]): void => {
  store.commit("task/reorderTasks", tasks);
}
const moveTaskToColumn = (task: Task): void => {
  store.commit("task/updateTask", task);
}
const deleteTask = (id: number): void => {
  store.commit("task/removeTask", id);
}
const addPanel = (title: string): void => {
  const newPanel: Panel = {
    id: Date.now(),
    title: title,
    colour: "#71DD37"
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
</script>

<template>
  <div class="task__board">
    <task-column
        v-for="panel in panels"
        :panel="panel"
        :tasks="tasks.filter((t: Task) => t.panelId === panel.id)"
        @openSidebar="openSidebar"
        @reorderLocal="reorderTasksInColumn"
        @reorderGlobal="moveTaskToColumn"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @deletePanel="deletePanel"
        :key="panel.id"
    />
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
.task__board {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: start;
  text-align: left;
  gap: 25px;
  height: 100%;
}
.add_panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>