<script setup lang="ts">

import BlockBtn from "@/components/UI/BlockBtn.vue";
import {ref} from "vue";

interface Props {
  show: boolean;
  color?: string;
  background?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  color: "currentColor",
  background: "#FFFFFF",
  placeholder: "Placeholder",
})

defineOptions({
  name: "add-form",
})

const emit = defineEmits([
    "add",
    "openForm",
]);

const titleRef = ref<string>('');

const add = (): void => {
  emit("add", titleRef.value);
  titleRef.value = "";
}
const openForm = (): void => {
  emit("openForm");
}
</script>

<template>
  <form class="add_form" v-if="show">
        <textarea
            v-model="titleRef"
            :placeholder="placeholder"
            maxlength="127"
            @keydown.enter.prevent="add"
            required
        />
    <input type="submit" hidden>
  </form>
  <block-btn
      :color="color"
      :background="background"
      icon="plus"
      @click="openForm"
  >
    <slot></slot>
  </block-btn>
</template>

<style scoped>
.add_form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.add_form textarea {
  width: 100%;
  resize: none;
  color: #384551;
  font-size: 14px;
  border: 1px solid #90A4AE50;
  border-radius: 10px;
  padding: 10px;
}

.add_form textarea:focus {
  border-color: #90A4AE;
  outline: none;
}
</style>