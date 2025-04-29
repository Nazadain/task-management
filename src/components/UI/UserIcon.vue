<script setup>

import Icon from "@/components/UI/Icon.vue";

</script>

<template>
<div class="user__icon">
  <Icon
      name="user"
      :size="12"
      color="#90A4AE"
  />
</div>
</template>

<style scoped>
.user__icon {
  display: flex;
  background: #F5F5F9;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
</style>