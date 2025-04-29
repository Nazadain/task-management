<script setup lang="ts">
import {ref} from "vue";
import {Task} from "@/types";

interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const newTaskText = ref('');

const emit = defineEmits({});

const addTask = () => {
  const newTask : Task = {
    id: Date.now(),
    title: newTaskText.value,
    deadline: null,
    priority: null,
    progress: 0,
    panelId: null
  }
  emit("addTask", newTask);
  newTaskText.value = "";
}
</script>

<template>
  <form
      v-if="props.show"
      class="add_task-form"
  >
        <textarea
            v-model="newTaskText"
            placeholder="Название задачи"
            maxlength="127"
            @keydown.enter.prevent="addTask"
            required
        />
    <input type="submit" hidden>
  </form>
</template>

<style scoped>
.add_task-form textarea {
  width: 100%;
  resize: none;
  color: #384551;
  font-size: 14px;
  border: 1px solid #90A4AE50;
  border-radius: 10px;
  padding: 10px;
}

.add_task-form textarea:focus {
  border-color: #90A4AE;
  outline: none;
}
</style>