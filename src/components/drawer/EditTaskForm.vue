<script setup lang="ts">
import {Content} from "@/store/drawer";
import {useStore} from "vuex";
import {RootState, User} from "@/types";
import {computed, ref} from "vue";
import api from "@/http/axios";
import {useRoute} from "vue-router";

interface Props {
  content: Content;
}

const props = defineProps<Props>();

const store = useStore<RootState>();
const emit = defineEmits();
const route = useRoute();

const panels = computed(() => store.getters["panel/panels"]);
const users = ref<User[]>([]);
const showModal = ref(false);
const selectedUserIds = ref<number[]>([]);
const boardId = computed<number>(() => Number(route.params.id));

const fetchUsers = async (): Promise<void> => {
  const response = await api.get(`/api/boards/${boardId.value}/members`);
  users.value = await response.data;
};
const submitForm = async (): Promise<void> => {

  await api.post(`/api/tasks/${props.content.value?.id}/workers`,
      {ships: selectedUserIds.value});

  emit("submitForm");
}
const toggleModal = (): void => {
  showModal.value = !showModal.value;
  if (showModal.value && users.value.length === 0) fetchUsers();
};

const toggleUser = (id: number): void => {
  if (selectedUserIds.value.includes(id)) {
    selectedUserIds.value = selectedUserIds.value.filter(uid => uid !== id);
  } else {
    selectedUserIds.value.push(id);
  }
};
</script>

<template>
  <form
      class="edit_form"
      @submit.prevent="submitForm"
  >
    <div class="form-item">
      <label for="title">Название задачи</label>
      <input
          id="title"
          type="text"
          name="title"
          v-model="content.value.title"
          required
      />
    </div>

    <div class="form-item">
      <label for="status">Статус</label>
      <select
          id="status"
          name="status"
          v-model="content.value.panel_id"
      >
        <option
            v-for="panel in panels"
            :value="panel.id">
          {{ panel.title }}
        </option>
      </select>
    </div>

    <div class="form-item">
      <label for="progress">Прогресс</label>
      <input
          id="progress"
          type="number"
          min="0"
          max="100"
          v-model="content.value.progress"
      />
    </div>

    <div class="form-item">
      <label for="deadline">Дедлайн</label>
      <input
          id="deadline"
          type="date"
          name="deadline"
          v-model="content.value.deadline"
      />
    </div>

    <div class="form-item">
      <label for="priority">Приоритет</label>
      <select
          id="priority"
          name="priority"
          v-model="content.value.priority"
      >
        <option :value="null">Нет</option>
        <option :value="0">Низкий</option>
        <option :value="1">Обычный</option>
        <option :value="2">Высокий</option>
      </select>
    </div>

    <div class="form-item">
      <button type="button" @click="toggleModal" class="submit-btn">
        Добавить участников
      </button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Выберите участников</h3>
        <div class="user-list">
          <div v-for="user in users" :key="user.id" class="user-item">
            <label>
              {{ user.name }}
              <input
                  type="checkbox"
                  :value="user.id"
                  :checked="selectedUserIds.includes(user.id)"
                  @change="toggleUser(user.id)"
              />
            </label>
          </div>
        </div>
        <button type="button" @click="toggleModal" class="submit-btn">Готово</button>
      </div>
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  max-height: 80%;
  overflow-y: auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
}

.user-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.submit-btn {
  background-color: #E7E7FF;
  color: #6F72FF;
  border: none !important;
  cursor: pointer;
}
</style>