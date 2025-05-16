<script setup lang="ts">

import TaskBoardModal from "@/components/task/modal/TaskBoardModal.vue";
import TaskBoardForm from "@/components/task/modal/TaskBoardForm.vue";
import {useStore} from "vuex";
import {Board, RootState} from "@/types";
import {computed, onMounted, ref} from "vue";

const emit = defineEmits([
    "edit",
    "close",
]);

const store = useStore<RootState>();

const board = computed<Board>(() => store.getters["board/board"]);

const title = ref<string>("");
const description = ref<string>("");
const isPrivate = ref<boolean>(false);

onMounted(() => {
  title.value = board.value.title;
  description.value = board.value.description;
  isPrivate.value = Boolean(board.value.is_private);
});

const onEdit = (): void => {
  const editedBoard: Board = {
    id: -1,
    title: title.value,
    description: description.value,
    is_private: isPrivate.value,
    role: "",
    panels: []
  }
  emit("edit", editedBoard);
}

</script>

<template>
  <task-board-modal
      @close="emit('close')"
  >
    <task-board-form @submit.prevent="onEdit">
      <h2>Редактирование доски</h2>

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

      <button class="submit-btn">Редактировать</button>
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