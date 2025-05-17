<script setup lang="ts">

import TaskBoardModal from "@/components/task/modal/TaskBoardModal.vue";
import TaskBoardForm from "@/components/task/modal/TaskBoardForm.vue";
import {Invite, Role} from "@/types";
import {onMounted, ref} from "vue";
import api from "@/http/axios";

interface Props {
  invites: Invite[];
}

defineProps<Props>();

const emit = defineEmits([
  "close",
  "generate"
]);

const totalCountRef = ref<number>(0);
const roleRef = ref<string>("");

const generateInvite = () => {
  const payload = {
    total_usages: totalCountRef.value,
    role: roleRef.value,
  }
  emit("generate", payload);
}
const copyToClipboard = (evt: MouseEvent) => {
  const target = evt.currentTarget as HTMLElement;

  const link = target.dataset.link;

  if (!link) return;

  navigator.clipboard.writeText(link).then(() => {
    alert("Ссылка скопирована в буфер!");
  }).catch(() => {
    alert("Не удалось скопировать ссылку");
  });
}

</script>

<template>
  <task-board-modal @close="emit('close')">
    <div class="modal-content">
      <task-board-form @submit.prevent="generateInvite">
        <h2>Пригласить пользователей</h2>

        <div class="form-item">
          <label for="inviteCount">Кол-во приглашений</label>
          <input
              id="inviteCount"
              class="form-input"
              type="number"
              min="1"
              name="inviteCount"
              placeholder="Введите количество"
              v-model="totalCountRef"
          />
        </div>

        <div class="form-item">
          <label for="role">Роль</label>
          <select
              name="role"
              id="role"
              v-model="roleRef"
          >
            <option value="manager">
              Менеджер
            </option>
            <option value="developer">
              Разработчик
            </option>
          </select>
        </div>

        <button
            class="submit-btn"
            type="submit"
        >
          Сгенерировать
        </button>
      </task-board-form>

      <div class="invites_container">
        <div
            v-for="invite in invites"
            class="invite"
            :data-link="`localhost:8080/invite/${invite.id}`"
            @click="copyToClipboard"
        >
          <div>{{ invite.role }}</div>
          <div>{{ invite.remain_usages }}/{{ invite.total_usages }}</div>
        </div>
      </div>
    </div>
  </task-board-modal>
</template>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: row;
  gap: 25px;
  width: 100%;
}

.invites_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 250px;
  height: 300px;
  border: 1px solid #90A4AE;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
}

.invites_container .invite {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  border: 1px solid #90A4AE;
  border-radius: 10px;
  width: 90%;
  cursor: pointer;
}
</style>