<script setup lang="ts">
import {Panel, Task, User} from "@/types";
import TaskCard from "@/components/task/TaskCard.vue";
import Icon from "@/components/UI/Icon.vue";
import AddTaskContainer from "@/components/panel/AddTask.vue";
import {onMounted, ref} from "vue";

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
  console.log(`PanelItem ID: ${id}`)
  emit("delete", id);
}

const users = ref<User[]>([]);

onMounted(async () => {
  const response = await fetch("/users.json")
  users.value = await response.json();
})

</script>

<template>
  <div class="panel">
    <header class="header">
      <div class="title">
        <div class="point" :style="`background: ${props.panel.colour}`"></div>
        {{ panel.title }}
      </div>
      <div class="icon">
        <Icon name="kebab" :size="24"/>
      </div>
    </header>

    <div class="tasks" v-if="tasks.length > 0">
      <task-card
          v-for="task in tasks"
          :task="task"
          :color="panel.colour"
          :participants="users.filter(u => task.id in u.tasks)"
          :key="task.id"
          @delete="deleteTask"
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

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 18px;
}

.header .title .point {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}

.header .icon {
  cursor: pointer;
}

.tasks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>