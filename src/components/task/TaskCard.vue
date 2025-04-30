<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import UserIcon from "@/components/UI/UserIcon.vue";
import {computed} from "vue";
import {Task, User} from "@/types";
import TaskTag from "@/components/task/TaskTag.vue";
import TaskProgress from "@/components/task/TaskProgress.vue";
import TaskHeader from "@/components/task/TaskHeader.vue";

interface Props {
  task: Task
  color?: string,
  participants?: User[],
}

const props = defineProps<Props>();

defineOptions({
  name: "task-card"
});

const emit = defineEmits({});

const shortWords: {[key: number]: string} = {
  0: "Низк",
  1: "Обычн",
  2: "Выс"
}
const shortPriorityName = computed(() => {
  if (props.task.priority !== undefined) {
    return shortWords[props.task.priority];
  }
});
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
const hasTaskData = computed(() => {
  return (
      props.task.deadline ||
      props.task.priority ||
      (props.participants && props.participants.length > 0)
  );
});
const deleteTask = (): void => {
  emit("deleteTask", props.task.id);
}

</script>

<template>
  <div class="task__card">
    <task-header
        :title="task.title"
        :icon-size="20"
        @delete="deleteTask"
    />

    <task-progress
        :progress="task.progress"
        :color="color"
    />

    <div
        v-if="hasTaskData"
        class="task-data"
    >
      <div class="tags">
        <task-tag
            v-if="props.task.deadline">
          <div class="icon">
            <Icon name="calendar" :size="20"/>
          </div>
          <p class="deadline-data">
            {{ formattedDeadline }}
          </p>
        </task-tag>

        <task-tag v-if="props.task.priority">
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
  width: 250px;
  box-shadow: 0 0 4px 0 #90A4AE50;
  background: #FFFFFF;
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