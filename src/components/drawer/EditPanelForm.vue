<script setup lang="ts">
import {Content} from "@/store/sidebar";

interface Props {
  content: Content;
}

defineProps<Props>();

const emit = defineEmits();

const submitForm = (): void => {
  emit("submitForm")
}
</script>

<template>
  <form
      class="edit_form"
      @submit.prevent="submitForm"
  >
    <div class="form-item">
      <label for="title">Название</label>
      <input
          id="title"
          type="text"
          name="title"
          v-model="content.value.title"
          required
      />
    </div>

    <div class="form-item">
      <label for="colour">Цвет</label>
      <input
          id="colour"
          type="color"
          name="colour"
          v-model="content.value.colour"
          required
      />
    </div>

    <input class="submit-btn" type="submit" value="Применить">
  </form>
</template>

<style scoped>
.edit_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
}

.edit_form .form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.edit_form input, select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #90A4AE;
  border-radius: 10px;
}

.edit_form select {
  cursor: pointer;
}

.submit-btn {
  background-color: #E7E7FF;
  color: #6F72FF;
  border: none !important;
  cursor: pointer;
}
</style>