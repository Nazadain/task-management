<script setup lang="ts">
import {ref} from "vue";
import TaskBoardModal from "@/components/task/modal/TaskBoardModal.vue";
import TaskBoardForm from "@/components/task/modal/TaskBoardForm.vue";
import {Board} from "@/types";

const emit = defineEmits([
  "create",
  "close",
]);

const title = ref<string>("");
const description = ref<string>("");
const isPrivate = ref<boolean>(false);

const onCreate = () => {
  const board: Board = {
    id: -1,
    title: title.value,
    description: description.value,
    is_private: isPrivate.value,
    role: "owner",
    panels: []
  }
  emit("create", board);
}

</script>

<template>
  <task-board-modal
      @close="emit('close')"
  >
    <task-board-form @submit.prevent="onCreate">
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
    </task-board-form>
  </task-board-modal>
</template>

<style scoped>
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
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
</style>