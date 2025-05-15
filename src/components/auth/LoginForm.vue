<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import {IconName} from "@/assets/icons";
import AuthForm from "@/components/auth/AuthForm.vue";
import {ref} from "vue";
import api from "@/http/axios";

const emailRef = ref<string>("");
const passwordRef = ref<string>("");

const fetchLogin = async (): Promise<void> => {
  const userData = {
    email: emailRef.value,
    password: passwordRef.value,
  }
  const resp = await api.post("/api/login", userData);
  console.log(resp);
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