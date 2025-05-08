<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import {Board} from "@/types";

interface Props {
  boards: Board[];
}

const props = defineProps<Props>();
</script>

<template>
  <nav class="nav">
    <router-link
        class="nav-link"
        to="/">
      <Icon
          class="nav-link-icon"
          name="home"
          :size="22"
      />
      Главная
    </router-link>
    <router-link
        class="nav-link"
        to="/boards"
    >
      <Icon
          class="nav-link-icon"
          name="board"
          :size="22"
      />
      Доски
    </router-link>
    <router-link
        v-for="board in boards"
        :to="`/boards/${board.id}`"
        class="nav-link side-link"
    >
      {{ board.title }}
    </router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.nav .nav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 5px;
  border-radius: 10px;
  transition: 0.2s;
}

.nav .nav-link:hover {
  background: #F5F5F9;
  cursor: pointer;
}

.nav .side-link {
  padding: 5px 32px;
  font-size: 14px;
}

.router-link-active {
  color: #6F72FF;
  background: #E7E7FF;
}

.router-link-active .nav-link-icon {
  fill: #6F72FF;
}

.router-link-active:hover {
  background: #E7E7FF !important;
}
</style>