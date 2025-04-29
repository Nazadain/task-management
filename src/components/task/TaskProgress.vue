<script setup lang="ts">
import ProgressBar from "@/components/UI/ProgressBar.vue";

interface Props {
  progress: number;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  color: 'currentColor'
});

defineOptions({
  name: 'task-progress',
})


</script>

<template>
  <div class="progress">
    <div class="info">
      <p class="progress-title">Прогресс</p>
      <p class="progress-percentage">{{ progress }}%</p>
    </div>
    <progress-bar
        :progress="progress"
        :color="color"
    />
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress .info {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
}

.progress .info .progress-title, .progress-percentage {
  font-size: 11px;
  color: #90A4AE;
  margin: 5px 0;
}
</style>