<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import UserIcon from "@/components/UI/UserIcon.vue";
import {computed} from "vue";
import {Task, User} from "@/types";
import TaskTag from "@/components/task/TaskTag.vue";
import TaskProgress from "@/components/task/TaskProgress.vue";
import CardHeader from "@/components/layout/CardHeader.vue";

interface Props {
  task: Task
  color?: string,
  participants?: User[],
}

const props = defineProps<Props>();

defineOptions({
  name: "task-card"
});

const shortWords = {
  0: "Низк",
  1: "Обычн",
  2: "Выс"
}

const shortPriorityName = computed(() =>
    shortWords[props.task.priority]);
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

</script>

<template>
  <div class="task__card">
    <card-header
        :title="task.title"
        :icon-size="20"
    />

    <task-progress
        :progress="task.progress"
        :color="color"
    />

    <div class="task-data">
      <div class="tags">
        <task-tag
            v-if="props.task.deadline !== null">
          <div class="icon">
            <Icon name="calendar" :size="20"/>
          </div>
          <p class="deadline-data">
            {{ formattedDeadline }}
          </p>
        </task-tag>

        <task-tag v-if="props.task.priority !== null">
          <div class="icon">
            <Icon name="clock" :size="20"/>
          </div>
          <p class="priority-data">
            {{ shortPriorityName }}
          </p>
        </task-tag>
      </div>

      <div class="participants" v-if="props.participants">
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
  box-shadow: 0 0 4px 0 #90A4AE50;
  border-radius: 10px;
  padding: 20px;
  gap: 15px;
  text-align: left;
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