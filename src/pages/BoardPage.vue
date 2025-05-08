<script setup lang="ts">
import TaskBoard from "@/components/task/TaskBoard.vue";
</script>

<template>
  <div class="scroll_container">
    <task-board/>
  </div>
</template>

<style scoped>
.scroll_container {
  flex: 1;
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>