<script setup lang="ts">

import PanelItem from "@/components/panel/PanelItem.vue";
import {onMounted, ref} from "vue";

defineOptions({
  name: "panel-container",
})

const panels = ref([]);
const tasks = ref([]);

onMounted(async () => {
  const panelsResponse = await fetch('/panels.json')
  panels.value = await panelsResponse.json();

  const tasksResponse = await fetch('/tasks.json')
  tasks.value = await tasksResponse.json();

});

const addTask = (newTask) => {
  tasks.value.push(newTask);
}
</script>

<template>
  <div class="panel__container">
    <panel-item
        v-for="panel in panels"
        :panel="panel"
        :tasks="tasks.filter(t => t?.panelId === panel.id) ?? []"
        @addTask="addTask"
        :key="panel.id"
    />
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
</style>