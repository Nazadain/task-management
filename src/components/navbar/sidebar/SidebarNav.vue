<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import {Board} from "@/types";

interface Props {
  boards: Board[];
  path: string;
}

const props = defineProps<Props>();

</script>

<template>
  <nav class="nav">
    <router-link
        class="nav-link"
        to="/">
      <div class="nav-link-content">
        <Icon
            class="nav-link-icon"
            name="home"
            :size="22"
        />
        Главная
      </div>
    </router-link>
    <router-link
        class="nav-link"
        to="/boards"
    >
      <div class="nav-link-content">
        <Icon
            class="nav-link-icon"
            name="board"
            :size="22"
        />
        Доски
      </div>
      <Icon class="arrow nav-link-icon"
            name="arrow"
            :size="22"
      />
    </router-link>
    <router-link
        v-if="props.path.startsWith('/boards')"
        v-for="board in boards"
        :to="`/boards/${board.id}`"
        class="side-link nav-link"
    >
      <p class="side-link-content">
        {{ board.title }}
      </p>
    </router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 25px;
}

.nav .nav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 10px;
  transition: 0.2s;
}

.nav .nav-link:hover {
  background: #F5F5F9;
  cursor: pointer;
}

.nav-link-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-link-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link .nav-link-icon {
  transition: 0.2s;
}

.nav .side-link {
  padding: 4px 36px;
  font-size: 14px;
  font-weight: normal;
}

.router-link-active {
  color: #6F72FF;
  background: #E7E7FF;
}

.router-link-active .nav-link-content, .router-link-active .side-link-content {
  color: #6F72FF;
}

.router-link-active .nav-link-icon {
  fill: #6F72FF;
}

.router-link-active .arrow {
  transform: rotate(90deg);
}

.router-link-active:hover {
  background: #E7E7FF !important;
}
</style>