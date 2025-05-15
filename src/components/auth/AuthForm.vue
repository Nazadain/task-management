<script setup lang="ts"></script>

<template>
  <form class="auth_form">
    <slot></slot>
  </form>
</template>

<style>
.auth_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.auth_form h2 {
  margin-bottom: 10px;
}

.auth_form .form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.auth_form .form-item label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.auth_form .form-input {
  padding: 8px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #90A4AE;
  outline: none;
  width: 100%;
}

.auth_form .form-router {
  display: flex;
  gap: 5px;
}

.auth_form .form-router .link {
  text-decoration: none;
  color: #6F72FF;
}

.auth_form .submit-btn {
  background: #E7E7FF;
  color: #6F72FF;
  cursor: pointer;
  border: none;
  font-size: 18px;
  padding: 8px 10px;
  border-radius: 10px;
  width: 100%;
  margin-top: 25px;
}
</style>