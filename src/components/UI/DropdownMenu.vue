<script setup>
defineOptions({
  name: "dropdown-menu",
})

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits({})

function hideModal() {
  emit("update:show", false);
}
</script>

<template>
  <div v-if="show" class="dropdown__menu" @click="hideModal">
    <slot></slot>
  </div>
</template>

<style scoped>
.dropdown__menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  padding: 10px;
  box-shadow: 0 0 4px 0 #90A4AE;
  background-color: #FFFFFF;
  border-radius: 10px;
  top: 25px;
  right: 0;
  z-index: 10;
}
</style>