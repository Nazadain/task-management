<script setup lang="ts">
import {Board} from "@/types";
import {ref} from "vue";

const emit = defineEmits([
    "create",
    "close",
]);

const title = ref<string>("");
const description = ref<string>("");
const isPrivate = ref<boolean>(false);

const onCreate = () => {
  const board = {
    title: title.value,
    description: description.value,
    is_private: isPrivate.value,
  }
}

</script>

<template>
  <div class="board-add__wrapper">
    <div class="board-add_container">

      <button class="close_modal" @click="emit('close')">X</button>

      <form
          class="add_form"
          @submit.prevent="onCreate"
      >
        <h2>Новая доска</h2>

        <div class="form-item">
          <label for="title">Название</label>
          <input
              id="title"
              class="form-input"
              type="text"
              name="title"
              placeholder="Введите название"
              v-model="title"
          />
        </div>

        <div class="form-item">
          <label for="description">Описание</label>
          <textarea
              id="description"
              class="form-input"
              rows="4"
              placeholder="Введите описание"
              v-model="description"
          ></textarea>
        </div>

        <div class="form-item checkbox">
          <label for="isPrivate">Приватная</label>
          <label class="switch">
            <input
                id="isPrivate"
                type="checkbox"
                name="isPrivate"
                v-model="isPrivate"
            />
            <span class="slider"></span>
          </label>
        </div>

        <button class="submit-btn">Создать доску</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.board-add__wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #11111140;
  z-index: 2000;
}

.board-add_container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background: #FFFFFF;
  border-radius: 10px;
  min-width: 400px;
}

.board-add_container .close_modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0 0 4px 0 #90A4AE90;
  background: #FFFFFF;
  border: none;
  outline: none;
  transition: 0.2s;
  cursor: pointer;
}

.board-add_container .close_modal:hover {
  box-shadow: 0 0 4px 0 #90A4AEDD;
}

.add_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.add_form h2 {
  margin-bottom: 10px;
}

.add_form .form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.add_form .form-item label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.add_form textarea {
  resize: none;
}

.add_form .form-input {
  padding: 8px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #90A4AE;
  outline: none;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  top: 0; left: 0; right: 0; bottom: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 2px; bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #6F72FF;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.add_form .submit-btn {
  background: #E7E7FF;
  color: #6F72FF;
  cursor: pointer;
  border: none;
  font-size: 18px;
  padding: 8px 10px;
  border-radius: 10px;
  width: 100%;
  margin-top: 25px;
}
</style>