<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";
import api from "@/http/axios";
import {useRoute} from "vue-router";
import {Board, Invite} from "@/types";
import router from "@/router/router";

const route = useRoute();
const id = computed<number>(() => Number(route.params.id));
const invite = ref(null);
const board = ref<Board | null>(null);

const fetchInvite = async (): Promise<void> => {
  const response = await api.get(`/api/invites/${id.value}`);
  const data = await response.data;
  board.value = data.board;
}
const acceptInvite = async (): Promise<void> => {
  try {
    await api.post(`/api/invites/${id.value}`);
    await router.push(`/boards`);
  } catch (e: any) {
    console.error(e);
  }
}

onMounted(async (): Promise<void> => {
  await fetchInvite();
});

watch(() => id.value, async (newVal: number) => {
  await fetchInvite();
});

</script>

<template>
  <div class="wrapper">
    <div
        v-if="board"
        class="container"
    >
      <div class="board-data">
        <h2 class="title">{{ board.title }}</h2>
        <p class="description">
          {{ board.description }}
        </p>
      </div>

      <div
          class="btn"
          @click="acceptInvite"
      >
        Присоединиться
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.wrapper .container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px;
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 #90A4AE50;
  min-height: 60%;
  min-width: 50%;
}

.wrapper .container .board-data {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.wrapper .container .board-data .title {
  font-size: 28px;
}

.wrapper .container .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E7E7FF;
  color: #6F72FF;
  font-size: 18px;
  border-radius: 10px;
  padding: 8px 10px;
  width: 40%;
  cursor: pointer;
}

</style>