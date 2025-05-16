<script setup lang="ts">
import SidebarContent from "@/components/navbar/sidebar/SidebarContent.vue";
</script>

<template>
<div class="sidebar__container">
  <sidebar-content />
</div>
</template>

<style scoped>
.sidebar__container {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  width: 15%;
  min-width: 250px;
  height: 100vh;
  background: #fff;
  border: 1px solid #EDEEF0;
  z-index: 1000;
  overflow-y: scroll;
}

@media (max-width: 1199px) {
  .sidebar__container {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .sidebar__container {
    display: none;
  }
}
</style>