<script setup lang="ts">

import {IconName} from "@/assets/icons";
import AuthForm from "@/components/auth/AuthForm.vue";
import Icon from "@/components/UI/Icon.vue";
import {ref} from "vue";
import api from "@/http/axios";
import {User} from "@/types";
import router from "@/router/router";
import Cookies from "js-cookie";

const emit = defineEmits([
    "loginUser",
]);

const usernameRef = ref<string>("");
const emailRef = ref<string>("");
const passwordRef = ref<string>("");
const passwordConfirmRef = ref<string>("");

const errorMessageRef = ref<string>("");

const fetchRegister = async (): Promise<void> => {
  try {
    if (passwordRef.value !== passwordConfirmRef.value) {
      throw new Error("Пароли не совпадают!");
    }
    const newUser = {
      name: usernameRef.value,
      email: emailRef.value,
      password: passwordRef.value,
    }
    const resp = await api.post("/api/auth/register", newUser);

    const respData = await resp.data;

    Cookies.set("token", respData.authorization.token, {
      expires: 1,
      path: "/",
    });

    const userData: User = {
      id: respData.user.id,
      name: respData.user.name,
      email: respData.user.email
    }

    emit("loginUser", userData);

    await router.push("/boards");

  } catch (e: any) {
    errorMessageRef.value = e.message;
  }
}

</script>

<template>
  <auth-form @submit.prevent="fetchRegister">
    <h2>Регистрация</h2>

    <div class="form-item">
      <label for="username">
        <Icon :name="IconName.USER_ICON" />
        Имя пользователя
      </label>
      <input
          type="text"
          class="form-input"
          id="username"
          name="username"
          placeholder="Введите имя пользователя"
          v-model="usernameRef"
          required
      />
    </div>

    <div class="form-item">
      <label for="email">
        <Icon :name="IconName.MAIL" />
        Email
      </label>
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

    <div class="form-item">
      <label for="password-confirm">
        <Icon :name="IconName.LOCK" />
        Подтверждение пароля
      </label>
      <input
          type="password"
          class="form-input"
          id="password-confirm"
          name="confirmPassword"
          placeholder="Введите пароль"
          v-model="passwordConfirmRef"
          required
      />
    </div>

    <div>{{ errorMessageRef }}</div>

    <div class="form-router">
      Уже есть аккаунт?
      <router-link
          to="/login"
          class="link"
      >
        Авторизуйтесь!
      </router-link>
    </div>

    <button
        type="submit"
        class="submit-btn"
    >
      Создать аккаунт
    </button>
  </auth-form>
</template>

<style scoped>

</style>