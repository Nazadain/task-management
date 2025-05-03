<script setup lang="ts">

import {ref} from "vue";
import {Task} from "@/types";
import AddForm from "@/components/UI/AddForm.vue";

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
    <add-form @add="addTask">
      Добавить задачу
    </add-form>
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