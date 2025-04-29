<script setup lang="ts">

import TaskCard from "@/components/task/TaskCard.vue";
import {onMounted, ref} from "vue";

const tasks = ref([]);

onMounted(async () => {
  const response = await fetch("/tasks.json")
  tasks.value = await response.json();
})

</script>

<template>
  <div>
    <h1>Hello, World!</h1>

    <div class="tasks">
      <task-card
          v-for="task in tasks"
          :task="task"
          color="#F59E0B"
          :participants="participants"
      />
    </div>


  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  gap: 25px;
}
</style>