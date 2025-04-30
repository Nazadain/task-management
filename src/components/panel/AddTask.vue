<script setup lang="ts">

import AddTaskForm from "@/components/panel/AddTaskForm.vue";
import {ref} from "vue";
import AddTaskBtn from "@/components/UI/AddTaskBtn.vue";
import {Task} from "@/types";

defineOptions({
  name: 'add-task-container'
})

const emit = defineEmits({});

const show = ref<boolean>(false);

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