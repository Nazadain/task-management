<script setup lang="ts">

interface Props {
  className?: string
}

const props = defineProps<Props>();

</script>

<template>
  <div :class="`tag ${props.className}`">
    <slot></slot>
  </div>
</template>

<style>
.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: #EDEEF0;
  border-radius: 10px;
  padding: 3px 5px;
  gap: 3px;
}
</style>