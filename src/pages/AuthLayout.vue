<script setup lang="ts">

import {computed} from "vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import {useRoute} from "vue-router";

const route = useRoute();

const isLogin = computed<boolean>(() => route.path === "/login");
const isRegister = computed<boolean>(() => route.path === "/register");

</script>

<template>
  <div class="auth__wrapper">
    <div class="auth_container">
      <LoginForm v-if="isLogin"/>
      <RegisterForm v-if="isRegister"/>
    </div>
  </div>
</template>

<style scoped>
.auth__wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth__wrapper .auth_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 #90A4AE50;
  min-width: 400px;
}
</style>