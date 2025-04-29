<script setup lang="ts">

import PanelContainer from "@/components/panel/PanelContainer.vue";
</script>

<template>
  <div>
    <h1>Hello, World!</h1>

    <div class="tasks">
      <panel-container/>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  gap: 25px;
}
</style>