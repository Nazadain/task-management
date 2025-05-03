<script setup lang="ts">

interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

defineOptions({
  name: "dropdown-menu",
})

const emit = defineEmits([
    "update:show",
])

function hideModal() {
  emit("update:show", false);
}
</script>

<template>
  <div v-if="props.show" class="dropdown__menu" @click="hideModal">
    <slot></slot>
  </div>
</template>

<style scoped>
.dropdown__menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 4px 0 #90A4AE;
  background-color: #FFFFFF;
  border-radius: 10px;
  top: 25px;
  right: 0;
  z-index: 10;
}
</style>