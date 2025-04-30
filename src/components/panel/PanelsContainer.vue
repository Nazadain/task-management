<script setup lang="ts">

import PanelItem from "@/components/panel/PanelItem.vue";
import {onMounted, ref} from "vue";
import Icon from "@/components/UI/Icon.vue";
import {Panel, Task} from "@/types";
import BlockBtn from "@/components/UI/BlockBtn.vue";

defineOptions({
  name: "panel-container",
})

const panels = ref<Panel[]>([]);
const tasks = ref<Task[]>([]);
const newPanelText = ref<string>('');

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
const deletePanel = (id: number): void => {
  panels.value = panels.value.filter(panel => panel.id !== id);
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
    <div class="add_panel">
      <form class="add_task-form">
        <textarea
            v-model="newPanelText"
            placeholder="Название задачи"
            maxlength="127"
            @keydown.enter.prevent="addTask"
            required
        />
        <input type="submit" hidden>
      </form>
      <block-btn icon="plus">
        Добавить колонку
      </block-btn>
    </div>
  </div>
</template>

<style scoped>
.panel__container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: start;
  text-align: left;
}

.add_panel .add_panel-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: #FFFFFF;
  box-shadow: 0 0 4px 0 #90A4AE50;
  border-radius: 10px;
  cursor: pointer;
}

.add_panel .add_panel-btn:hover {
  box-shadow: 0 0 4px 0 #90A4AE80;
  transition: 0.2s;
}
</style>