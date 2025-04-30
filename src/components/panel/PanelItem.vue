<script setup lang="ts">
import {Panel, Task, User} from "@/types";
import TaskCard from "@/components/task/TaskCard.vue";
import AddTaskContainer from "@/components/panel/AddTask.vue";
import {onMounted, ref} from "vue";
import PanelHeader from "@/components/panel/PanelHeader.vue";
import AddForm from "@/components/UI/AddForm.vue";

interface Props {
  panel: Panel;
  tasks: Task[];
}

const props = defineProps<Props>()

defineOptions({
  name: 'panel-item'
})

const emit = defineEmits({});

const isFormOpen = ref<boolean>(false);

const addTask = (title: string): void => {
  const newTask: Task = {
    id: Date.now(),
    title: title,
    progress: 0,
    deadline: undefined,
    priority: undefined,
    panelId: props.panel.id
  }
  emit("addTask", newTask);
  isFormOpen.value = false;
}
const deleteTask = (id: number): void => {
  emit("deleteTask", id);
}
const deletePanel = (): void => {
  emit("deletePanel", props.panel.id);
}
const openForm = () => {
  isFormOpen.value = true;
}

const users = ref<User[]>([]);

onMounted(async () => {
  const response = await fetch("/users.json");
  users.value = await response.json();
})

</script>

<template>
  <div class="panel">
    <panel-header
        :title="panel.title"
        :color="panel.colour"
        @deletePanel="deletePanel"
        @openTaskForm="openForm"
    />

    <div class="tasks" v-if="tasks.length > 0">
      <task-card
          v-for="task in tasks"
          :task="task"
          :color="panel.colour"
          :participants="users.filter((u: User) => u.tasks.includes(task.id))"
          :key="task.id"
          @deleteTask="deleteTask"
      />
    </div>
    <add-form
        :show="isFormOpen"
        @add="addTask"
        @openForm="openForm"
    >
      Добавить задачу
    </add-form>
  </div>
</template>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>