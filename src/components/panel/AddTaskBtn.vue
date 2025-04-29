<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";

defineOptions({
  name: 'add-task-btn'
})
</script>

<template>
  <div class="add_task-btn">
    <div class="plus-icon">
      <Icon name="plus" :size="15"/>
    </div>
    Добавить задачу
  </div>
</template>

<style scoped>
.add_task-btn {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 3px;
  padding: 10px;
  background: #FFFFFF;
  box-shadow: 0 0 4px #90A4AE50;
  border-radius: 10px;
  cursor: pointer;
}

.add_task-container .add_task-btn:hover {
  box-shadow: 0 0 4px #90A4AE90;
  transition: 0.2s;
}
</style>