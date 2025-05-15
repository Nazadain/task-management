<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import {IconName} from "@/assets/icons";
import AuthForm from "@/components/auth/AuthForm.vue";
import {ref} from "vue";
import api from "@/http/axios";
import {User} from "@/types";

const emit = defineEmits([
    "loginUser"
]);

const emailRef = ref<string>("");
const passwordRef = ref<string>("");

const fetchLogin = async (): Promise<void> => {
  try {
    const userData = {
      email: emailRef.value,
      password: passwordRef.value,
    }
    const resp = await api.post("/api/auth/login", userData);
    const respData = await resp.data;

    document.cookie = `${respData.authorization.token}; path=/; max-age=3600`;

    const user: User = {
      id: respData.id,
      username: respData.name,
      email: respData.email
    }

    emit("loginUser", user);
  } catch (e: any) {
    console.error(e.message);
  }
}

</script>

<template>
  <auth-form @submit.prevent="fetchLogin">
    <h2>Авторизация</h2>

    <div class="form-item">
      <label for="email">
        <Icon :name="IconName.MAIL" />
        Email</label>
      <input
          type="text"
          class="form-input"
          id="email"
          name="email"
          placeholder="Введите e-mail"
          v-model="emailRef"
          required
      />
    </div>

    <div class="form-item">
      <label for="password">
        <Icon :name="IconName.LOCK" />
        Пароль
      </label>
      <input
          type="password"
          class="form-input"
          id="password"
          name="password"
          placeholder="Введите пароль"
          v-model="passwordRef"
          required
      />
    </div>

    <div class="form-router">
      Нет аккаунта?
      <router-link
          to="/register"
          class="link"
      >Зарегистрируйтесь!
      </router-link>
    </div>

    <button
        type="submit"
        class="submit-btn"
    >Войти</button>
  </auth-form>
</template>

<style scoped>

</style>