<script setup lang="ts">

import PanelsContainer from "@/components/panel/PanelsContainer.vue";
import EditDrawer from "@/components/UI/EditDrawer.vue";
</script>

<template>
  <div>
    <edit-drawer />
    <div class="container">
      <h1>Hello, World!</h1>
      <div class="tasks">
        <panels-container/>
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