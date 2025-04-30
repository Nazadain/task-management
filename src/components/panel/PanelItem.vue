<script setup lang="ts">
import {Panel, Task, User} from "@/types";
import TaskCard from "@/components/task/TaskCard.vue";
import AddTaskContainer from "@/components/panel/AddTask.vue";
import {onMounted, ref} from "vue";
import PanelHeader from "@/components/panel/PanelHeader.vue";

interface Props {
  panel: Panel;
  tasks: Task[];
}

const props = defineProps<Props>()

defineOptions({
  name: 'panel-item'
})

const emit = defineEmits({});

const addTask = (newTask: Task): void => {
  newTask.panelId = props.panel.id;
  emit("addTask", newTask);
}

const deleteTask = (id: number): void => {
  emit("deleteTask", id);
}
const deletePanel = (): void => {
  emit("deletePanel", props.panel.id)
}

const users = ref<User[]>([]);

onMounted(async () => {
  const response = await fetch("/users.json")
  users.value = await response.json();
})

</script>

<template>
  <div class="panel">
    <panel-header
        :title="panel.title"
        :color="panel.colour"
        @deletePanel="deletePanel"
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

    <add-task-container
        @addTask="addTask"
    />
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  gap: 10px;
}

.tasks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>