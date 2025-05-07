<script setup>

import SidebarContainer from "@/components/navbar/sidebar/SidebarContainer.vue";
import TopbarContainer from "@/components/navbar/topbar/TopbarContainer.vue";

</script>

<template>
  <div class="app">
    <sidebar-container/>
    <div class="app-body">
      <topbar-container name="Название доски" />
      <div class="scroll-container">
        <div class="app-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #384551;
  margin: 0;
  padding: 0;
}

html, body {
  background: #F5F5F9;
  overflow: hidden;
}

html, body, #app, .app {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.app-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.app-content {
  min-height: max-content;
}

.scroll-container {
  flex: 1;
  overflow: auto;
  height: 100%;
  padding: 25px 25px 100px 25px;
}

*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-thumb {
  background: #6F72FF;
  border-radius: 10px;
}

</style>
