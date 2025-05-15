<script setup lang="ts">

import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {ref} from "vue";
import SidebarContainer from "@/components/navbar/sidebar/SidebarContainer.vue";
import echo from "@/services/echo";

const pageTitle = ref<string>("");

const setTitle = (title: string): void => {
  pageTitle.value = title;
}

</script>

<template>
  <drawer/>
  <div class="boards__container">
    <sidebar-container/>
    <div class="boards__body">
      <topbar-container :name="pageTitle"/>
      <router-view v-slot="{Component}">
        <component :is="Component" @title="setTitle"/>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.boards__container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  height: 100vh;
}

.boards__container .boards__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
</style>