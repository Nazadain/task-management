<script setup lang="ts">

import {onBeforeMount} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/types";
import axios from "axios";

const store = useStore<RootState>();

onBeforeMount(async () => {
  const boardResp = await axios.get("/boards.json");
  const boards = await boardResp.data;
  store.commit("board/setBoards", boards);
})

</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  color: #384551;
  margin: 0;
  padding: 0;
}

html, body {
  background: #F5F5F9;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}

html, body, #app, .app, .app-body {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: row;
  width: 100%;
}

*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-thumb {
  background: #6F72FF;
  border-radius: 10px;
}

@font-face {
  font-family: "Roboto";
  src: url("@/assets/fonts/Roboto/Roboto-VariableFont.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

</style>
