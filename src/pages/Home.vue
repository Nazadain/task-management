<script setup lang="ts">

import TaskBoard from "@/components/task/TaskBoard.vue";
import Drawer from "@/components/drawer/Drawer.vue";
</script>

<template>
  <div>
    <drawer />
    <div class="container">
      <h1>Hello, World!</h1>
      <div class="tasks__container">
        <task-board/>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 25px;
  gap: 25px;
}
</style>