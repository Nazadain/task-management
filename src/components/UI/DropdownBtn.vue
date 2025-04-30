<script setup lang="ts">
import Icon from "@/components/UI/Icon.vue";

interface Props {
  icon: string
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "currentColor",
});
</script>

<template>
  <div class="btn" :style="`color: ${props.color}`">
    <Icon :name="icon" :size="20" :color="color" />
    <slot></slot>
  </div>
</template>

<style scoped>
.btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 5px;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
}

.btn:hover {
  background: #F5F5F9;
  transition: 0.2s;
}
</style>