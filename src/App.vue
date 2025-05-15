<script setup lang="ts">

import {useStore} from "vuex";
import {RootState} from "@/types";
import Cookies from "js-cookie";
import {onMounted} from "vue";
import api from "@/http/axios";

const store = useStore<RootState>();

onMounted(async () => {
  try {
    store.commit("setAuthLoading", true);

    const token: string | undefined = Cookies.get("token");
    if (!token) {
      throw new Error("Token not found.");
    }
    const response = await api.get("/api/profile", {
      headers: {"Authorization": `Bearer ${token}`},
    });

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    }

    store.commit("setIsAuth", true);
    store.commit("setUser", user);
  } catch (e: any) {
    store.commit("setIsAuth", false);
  } finally {
    store.commit("setAuthLoading", false);
  }
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
