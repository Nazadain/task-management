<script setup lang="ts">

import {IconName} from "@/assets/icons";
import AuthForm from "@/components/auth/AuthForm.vue";
import Icon from "@/components/UI/Icon.vue";
</script>

<template>
  <auth-form>
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
          required
      />
    </div>

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