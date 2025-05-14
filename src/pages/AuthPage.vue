<script setup lang="ts">

import {onMounted} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import api from "@/http/axios";

const fetchLogin = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");

    await api.post('/register', {
      name: "Nazadain",
      email: "nazadain@gmail.com",
      password: "NekitPlay123",
      password_confirmation: "NekitPlay123",
    });

    await api.post("/login", {
      email: "email@email.com",
      password: "NekitPlay123",
    });
  } catch (e: any) {
    console.error("Validation error:", e.response?.data);
  }
}

onMounted(() => {
  fetchLogin();
});

</script>

<template>

</template>

<style scoped>

</style>