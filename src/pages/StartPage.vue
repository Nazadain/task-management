<script setup lang="ts">

</script>

<template>
  <div class="page__container">
    <header class="page_header">
      <h1 class="logo">LOGO</h1>
      <router-link
          to="/login"
          class="login-btn"
      >
        Войти
      </router-link>
    </header>
  </div>
</template>

<style scoped>
.page__container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  width: 100%;
  height: 50px;
  background: #FFFFFF;
}

.page_header .logo {
  font-size: 28px;
}

.page_header .login-btn {
  font-size: 16px;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 10px;
  background: #E7E7FF;
  color: #6F72FF;
}
</style>