<script setup lang="ts">

import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import {ref} from "vue";

const pageTitle = ref<string>("");

const setTitle = (title: string): void => {
  pageTitle.value = title;
}

</script>

<template>
  <drawer/>
  <div class="boards__container">
    <topbar-container :name="pageTitle"/>
    <router-view v-slot="{Component}">
      <component :is="Component" @title="setTitle" />
    </router-view>
  </div>
</template>

<style scoped>
.boards__container {
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  flex: 1;
  height: 100vh;
}
</style>