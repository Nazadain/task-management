<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";

interface Props {
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 12
})

</script>

<template>
  <div
      class="user__icon"
      :style="`width: ${size * 2}px; height: ${size * 2}px;`"
  >
    <Icon
        name="user"
        :size="size"
        color="#90A4AE"
    />
  </div>
</template>

<style scoped>
.user__icon {
  display: flex;
  background: #F5F5F9;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
</style>