<script setup lang="ts">

import PanelItem from "@/components/panel/PanelItem.vue";
import {onMounted, ref} from "vue";
import {Panel, Task} from "@/types";
import AddForm from "@/components/UI/AddForm.vue";

defineOptions({
  name: "panel-container",
})

const panels = ref<Panel[]>([]);
const tasks = ref<Task[]>([]);
const isFormOpen = ref<boolean>(false);

onMounted(async () => {
  const panelsResponse = await fetch('/panels.json')
  panels.value = await panelsResponse.json();

  const tasksResponse = await fetch('/tasks.json')
  tasks.value = await tasksResponse.json();
});

const addTask = (newTask: Task): void => {
  tasks.value.push(newTask);
}
const deleteTask = (id: number): void => {
  tasks.value = tasks.value.filter(task => task.id !== id);
}
const addPanel = (title: string): void => {
  const newPanel: Panel = {
    id: Date.now(),
    title: title,
    colour: "#71DD37"
  }
  panels.value.push(newPanel);
  isFormOpen.value = false;
}
const deletePanel = (id: number): void => {
  panels.value = panels.value.filter(panel => panel.id !== id);
}
const openForm = (): void => {
  isFormOpen.value = true;
}
</script>

<template>
  <div class="panel__container">
    <panel-item
        v-for="panel in panels"
        :panel="panel"
        :tasks="tasks.filter((t: Task) => t?.panelId === panel.id) ?? []"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @deletePanel="deletePanel"
        :key="panel.id"
    />
    <div class="panel add_panel">
      <add-form
          :show="isFormOpen"
          @add="addPanel"
          @openForm="openForm"
      >
        Добавить колонку
      </add-form>
    </div>
  </div>
</template>

<style scoped>
.panel__container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: start;
  text-align: left;
  gap: 25px;
}

.panel__container .panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  gap: 10px;
}
</style>