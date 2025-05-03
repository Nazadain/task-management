<script setup lang="ts">
import {Panel, Task, User} from "@/types";
import TaskCard from "@/components/task/TaskCard.vue";
import {computed, onMounted, ref} from "vue";
import TaskColumnHeader from "@/components/task/TaskColumnHeader.vue";
import AddForm from "@/components/UI/AddForm.vue";
import {Content} from "@/store/sidebar";
import {VueDraggableNext} from "vue-draggable-next";

interface Props {
  panel: Panel;
  tasks: Task[];
}

const props = defineProps<Props>()

defineOptions({
  name: 'panel-item'
})

const emit = defineEmits([
  "addTask",
  "deleteTask",
  "deletePanel",
  "openSidebar",
]);

const isFormOpen = ref<boolean>(false);

const filteredTasks = computed(() => {
  return props.tasks.filter((t: Task) => t.panelId === props.panel.id);
})

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
const reorderTasks = (e: any) => {
  console.log(`Task orderIndex: ${e.newIndex}`);
  // Получаем e.newIndex и передаём его в бд
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
const openSidebar = (): void => {
  const panel = {...props.panel};

  const content: Content = {
    value: panel,
    type: "panel",
  }
  emit("openSidebar", content);
}

const users = ref<User[]>([]);

onMounted(async () => {
  const response = await fetch("/users.json");
  users.value = await response.json();
})

</script>

<template>
  <div class="task__column">
    <task-column-header
        :title="panel.title"
        :color="panel.colour"
        @deletePanel="deletePanel"
        @openTaskForm="openForm"
        @openSidebar="openSidebar"
    />

    <add-form
        :show="isFormOpen"
        placeholder="Название задачи"
        @add="addTask"
        @openForm="openForm"
    >
      Добавить задачу
    </add-form>

    <VueDraggableNext
        class="tasks__container"
        v-model:list="tasks"
        group="tasks"
        @end="reorderTasks"
    >
      <task-card
          v-for="task in filteredTasks"
          :task="task"
          :color="panel.colour"
          :participants="users.filter((u: User) => u.tasks.includes(task.id))"
          :key="task.id"
          @deleteTask="deleteTask"
      />
    </VueDraggableNext>
  </div>
</template>

<style scoped>
.task__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  gap: 10px;
}

.tasks__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>