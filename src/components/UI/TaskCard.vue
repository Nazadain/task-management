<script setup>

import Icon from "@/components/UI/Icon.vue";
import UserIcon from "@/components/UI/UserIcon.vue";
import {onBeforeMount, ref} from "vue";
import DropdownMenu from "@/components/UI/DropdownMenu.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor"
  },
  percentage: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    default: null,
  },
  priority: {
    type: Number,
    default: null
  },
  participants: {
    type: Array,
    default: () => []
  },
});

defineOptions({
  name: "task-card"
});

let priorityName = null;
let show = ref(false);

function setPriority(priority) {
  if (!priority) {
    return;
  }

  if (priority == 0) {
    priorityName = "Низкий";
  } else if (priority == 1) {
    priorityName = "Обычный"
  } else {
    priorityName = "Высокий"
  }
}

function trimWords(word) {
  if (word === "Обычный") {
    return "Обычн"
  } else if (word === "Низкий") {
    return "Низк"
  } else if (word === "Высокий") {
    return "Выс"
  } else {
    return word;
  }
}

onBeforeMount(() => {
  setPriority(props.priority)
})

</script>

<template>
  <div class="task__card">
    <header class="header">
      <dropdown-menu v-model:show="show"></dropdown-menu>
      <p class="title">{{ title }}</p>
      <div class="kebab-menu">
        <Icon name="kebab" size="20" @click="show = !show"/>
      </div>
    </header>

    <div class="progress">
      <div class="info">
        <p class="progress-title">Прогресс</p>
        <p class="progress-percentage">{{ percentage }}%</p>
      </div>
      <div class="progress-bar">
        <div class="bar"
             :style="`width: ${props.percentage}%; background: ${props.color}`"
        />
      </div>
    </div>

    <div class="task-data">
      <div class="tags">
        <div
            v-if="props.deadline"
            class="tag deadline"
        >
          <div class="icon">
            <Icon name="calendar" size="20"/>
          </div>

          <p class="deadline-data">
            {{ props.deadline }}
          </p>
        </div>

        <div
            v-if="props.priority"
            class="tag priority"
        >
          <div class="icon">
            <Icon name="clock" size="20"/>
          </div>

          <p class="priority-data">
            {{ trimWords(priorityName) }}
          </p>
        </div>
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

.task-data .tags .tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: #EDEEF0;
  border-radius: 10px;
  padding: 3px 5px;
  gap: 3px;
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