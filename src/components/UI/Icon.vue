<script setup>
import {computed} from "vue";
import {icons} from "@/assets/icons";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
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