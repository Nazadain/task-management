<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";

defineOptions({
  name: "sidebar-search",
})
</script>

<template>
  <form class="search__container">
    <div class="search_field">
      <Icon name="search" :size="18"/>
      <input type="text" placeholder="Поиск">
    </div>
  </form>
</template>

<style scoped>
.search__container {
  display: flex;
  width: 100%;
  padding: 0 5px;
}

.search__container .search_field {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
  color: #90A4AE;
  border: 1px solid #90A4AE;
  border-radius: 20px;
  padding: 5px 10px;
  width: 100%;
}

.search__container .search_field input {
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
}
</style>