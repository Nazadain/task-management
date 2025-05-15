<script setup lang="ts">

import {useStore} from "vuex";
import {RootState} from "@/types";
import Cookies from "js-cookie";
import {onBeforeMount} from "vue";
import api from "@/http/axios";

const store = useStore<RootState>();

onBeforeMount(async () => {
  try {
    store.commit("setAuthLoading", true);
    console.log("НАЧАЛО ПРОВЕРКИ АВТОРИЗОВАННОСТИ");
    const token: string | undefined = Cookies.get("token");
    if (!token) {
      console.log("ТОКЕН НЕ НАЙДЕН");
      store.commit("setIsAuth", false);
      return
    }
    console.log("ТОКЕН УСПЕШНО НАЙДЕН");
    await api.get("/api/profile", {
      headers: {"Authorization": `Bearer ${token}`},
    });
    console.log("ТОКЕН ВАЛИДНЫЙ")

    store.commit("setIsAuth", true);
  } catch (e: any) {
    console.log("ТОКЕН НЕ ВАЛИДНЫЙ")
    console.error(e);
    store.commit("setIsAuth", false);
  }
  store.commit("setAuthLoading", false);
});

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
