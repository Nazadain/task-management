<script setup lang="ts">

defineOptions({
  name: 'drawer-content',
});
</script>

<template>
  <div class="drawer__content">
    <slot />
  </div>
</template>

<style scoped>
.drawer__content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>