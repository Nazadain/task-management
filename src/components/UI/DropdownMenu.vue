<script setup lang="ts">

import {nextTick, onBeforeUnmount, ref, watch} from "vue";

interface Props {
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const emit = defineEmits(["update:show"]);
const dropdownRef = ref<HTMLElement | null>(null);

const hideModal = (): void => {
  emit("update:show", false);
};

const onKeydown = (e: KeyboardEvent): void => {
  if (e.key === "Escape") {
    hideModal();
  }
};

watch(
    () => props.show,
    (newVal) => {
      if (newVal) {
        nextTick(() => {
          document.addEventListener("click", hideModal);
          document.addEventListener("keydown", onKeydown);
        });
      } else {
        document.removeEventListener("click", hideModal);
        document.removeEventListener("keydown", onKeydown);
      }
    }
);

onBeforeUnmount(() => {
  document.removeEventListener("click", hideModal);
  document.removeEventListener("keydown", onKeydown);
});

</script>

<template>
  <div
      v-if="props.show"
      ref="dropdownRef"
      class="dropdown__menu"
  >
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
  z-index: 10;
}
</style>