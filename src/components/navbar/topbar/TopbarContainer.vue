<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";

interface Props {
  name: string;
}

const props = defineProps<Props>();

</script>

<template>
  <div class="topbar__container">
    <h1 class="page-name">{{ name }}</h1>
    <div class="add__board-btn">
      <Icon name="plus" :size="16" color="#6F72FF"/>
      Доска
    </div>
  </div>
</template>

<style scoped>
.topbar__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0 40px;
  border: 1px none #EDEEF0;
  border-bottom-style: solid;
  background: #fff;
  z-index: 1000;
}

.topbar__container .page-name {
  font-size: 20px;
}

.topbar__container .add__board-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #E7E7FF;
  color: #6F72FF;
  cursor: pointer;
}
</style>