<script setup lang="ts">

import AddTaskBtn from "@/components/panel/AddTaskBtn.vue";
import AddTaskForm from "@/components/panel/AddTaskForm.vue";
import {ref} from "vue";

defineOptions({
  name: 'add-task-container'
})

const emit = defineEmits({});

const show: boolean = ref(false);

const addTask = (newTask: Task): void => {
  emit("addTask", newTask);
  show.value = false;
}

const openForm = (): void => {
  show.value = true;
}
</script>

<template>
  <div class="add_task-container">
    <add-task-form
        :show="show"
        @addTask="addTask"
    />
    <add-task-btn
        @click="openForm"
    />
  </div>
</template>

<style scoped>
.add_task-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>