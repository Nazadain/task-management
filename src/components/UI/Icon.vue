<script setup lang="ts">
import {computed} from "vue";
import {icons} from "@/assets/icons";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentcolor',
});

const icon = computed(() => icons[props.name] || '');
const iconPath = icon.value.path;
const iconSize = icon.value.size;

</script>

<template>
  <svg
      v-if="iconPath"
      :width="size"
      :height="size"
      :fill="color"
      v-html="iconPath"
      :viewBox="`0 0 ${iconSize} ${iconSize}`"
      xmlns="http://www.w3.org/2000/svg"
  />
</template>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>