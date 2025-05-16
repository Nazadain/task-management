<script setup lang="ts">
import {Content} from "@/store/drawer";
import {useStore} from "vuex";
import {Panel, RootState} from "@/types";
import {computed} from "vue";

interface Props {
  content: Content;
}

const props = defineProps<Props>();

const store = useStore<RootState>();

const emit = defineEmits();

const panels = computed(() => store.getters["panel/panels"]);

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
          v-model="content.value.parentId"
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
        <option :value="undefined">Нет</option>
        <option :value="0">Низкий</option>
        <option :value="1">Обычный</option>
        <option :value="2">Высокий</option>
      </select>
    </div>

    <div class="participants-list">

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