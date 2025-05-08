<script setup lang="ts">

import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";
import Drawer from "@/components/drawer/Drawer.vue";
</script>

<template>
  <drawer/>
  <div class="container">
    <topbar-container name="Название доски"/>
    <router-view />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  flex: 1;
  height: 100vh;
}
</style>