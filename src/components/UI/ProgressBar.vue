<script setup lang="ts">

interface Props {
  progress: number,
  color: string,
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  color: 'currentColor',
})

defineOptions({
  name: 'progress-bar',
})
</script>

<template>
  <div class="progress-bar">
    <div class="bar"
         :style="`width: ${props.progress}%; background: ${props.color}`"
    />
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 6px;
  border-radius: 10px;
  background-color: #E7E7FF;
  padding: 0;
}

.progress-bar .bar {
  height: 100%;
  border-radius: 10px;
}
</style>