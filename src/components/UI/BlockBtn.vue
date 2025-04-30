<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";

interface Props {
  icon: string;
  background?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  background: "#FFFFFF",
  color: "currentColor",
});

defineOptions({
  name: 'block-btn'
})
</script>

<template>
  <div
      class="block-btn"
      :style="`background: ${props.background}; color: ${props.color};`"
  >
    <Icon :name="icon" :size="15" :color="color" />
    <slot></slot>
  </div>
</template>

<style scoped>
.block-btn {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 3px;
  padding: 10px;
  box-shadow: 0 0 4px #90A4AE50;
  border-radius: 10px;
  cursor: pointer;
}

.block-btn:hover {
  box-shadow: 0 0 4px #90A4AE90;
  transition: 0.2s;
}
</style>