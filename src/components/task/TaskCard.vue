<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import UserIcon from "@/components/UI/UserIcon.vue";
import {computed, ref} from "vue";
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import {Task, User} from "@/types";
import TaskTag from "@/components/task/TaskTag.vue";

interface Props {
  task: Task
  color?: string,
  participants: User[],
}

const props = defineProps<Props>();

defineOptions({
  name: "task-card"
});

const priorities = {
  0: "Низкий",
  1: "Обычный",
  2: "Высокий"
}

const slicedWords = {
  "Низкий": "Низк",
  "Обычный": "Обычн",
  "Высокий": "Выс"
}

const priorityName = computed(() =>
    priorities[props.task.priority]);
const slicedPriority = computed(() =>
    slicedWords[priorityName.value]);
const formattedDeadline = computed(() => {
  const raw = props.task.deadline;
  if (!raw) return null;
  const date = new Date(raw);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
  });
});
const show = ref(false);

</script>

<template>
  <div class="task__card">
    <header class="header">
      <dropdown-menu v-model:show="show"></dropdown-menu>
      <p class="title">{{ task.title }}</p>
      <div class="kebab-menu">
        <Icon name="kebab" :size="20" @click="show = !show"/>
      </div>
    </header>

    <div class="progress">
      <div class="info">
        <p class="progress-title">Прогресс</p>
        <p class="progress-percentage">{{ task.progress }}%</p>
      </div>
      <div class="progress-bar">
        <div class="bar"
             :style="`width: ${task.progress}%; background: ${props.color}`"
        />
      </div>
    </div>

    <div class="task-data">
      <div class="tags">
        <task-tag v-if="task.deadline">
          <div class="icon">
            <Icon name="calendar" size="20"/>
          </div>

          <p class="deadline-data">
            {{ formattedDeadline }}
          </p>
        </task-tag>
        <task-tag v-if="task.priority">
          <div class="icon">
            <Icon name="clock" size="20"/>
          </div>

          <p class="priority-data">
            {{ slicedPriority }}
          </p>
        </task-tag>
      </div>

      <div class="participants">
        <UserIcon
            v-for="(user, index) in participants"
            :key="user.id"
            :style="`z-index:${participants.length - index}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.task__card {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 150px;
  width: 250px;
  box-shadow: 0 0 4px 0 #90A4AE;
  border-radius: 10px;
  padding: 20px;
  gap: 15px;
  text-align: left;
}

.header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
}

.header .title {
  margin: 0;
}

.header .kebab-menu {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress .info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.progress .info .progress-title, .progress-percentage {
  font-size: 11px;
  color: #90A4AE;
  margin: 5px 0;
}

.progress .progress-bar {
  width: 100%;
  height: 6px;
  border-radius: 10px;
  background-color: #E7E7FF;
  padding: 0;
}

.progress .progress-bar .bar {
  height: 100%;
  border-radius: 10px;
}

.task-data {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.task-data .tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.task-data .participants {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
}

.task-data .participants *:not(:last-child) {
  margin-right: -15px;
}
</style>