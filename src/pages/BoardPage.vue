<script setup lang="ts">
import TaskBoard from "@/components/task/TaskBoard.vue";
import {useRoute} from "vue-router";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {Board, Invite, Panel, RootState} from "@/types";
import echo from "@/services/echo";
import TaskBoardInvite from "@/components/task/modal/TaskBoardInvite.vue";
import api from "@/http/axios";

const route = useRoute();
const emit = defineEmits(["title"]);
const store = useStore<RootState>();

const id = computed<Number>(() => Number(route.params.id));
const board = computed<Board>(() => store.getters["board/board"]);
const panels = computed<Panel[]>(() => store.getters["panel/panels"]);
const isInviteUserActive = computed<boolean>(() =>
    store.getters["board/isInviteOpen"]);
const invites = ref<Invite[]>([]);

const movePanel = () => {
  store.commit("panel/updatePanel");
}
const closeInviteUser = (): void => {
  store.commit("board/setInviteOpen", false);
}
const generateInvite = async (payload: any): Promise<void> => {
  const response = await api.post(`/api/boards/${id.value}/invites`, payload);
  const data: Invite = await response.data;
  invites.value.push(data);
}

onMounted(async () => {
  if (id.value) {
    const response = await api.get(`/api/boards/${id.value}/invites`);
    invites.value = await response.data;
  }
})

onBeforeMount(async () => {
  await store.dispatch("board/fetchBoard", id.value);
});

watch(id, async (newId) => {
  await store.dispatch("board/fetchBoard", newId);
  const response = await api.get(`/api/boards/${id.value}/invites`);
  invites.value = await response.data;
});

watch(board, (newBoard) => {
  if (newBoard) {
    emit("title", newBoard.title);
  }
}, {immediate: true});
</script>

<template>
  <div class="scroll_container">
    <task-board-invite
        v-if="isInviteUserActive"
        v-model:invites="invites"
        @generate="generateInvite"
        @close="closeInviteUser"
    />
    <task-board
        v-if="board"
        :board="board"
        :boardId="id"
        :panels="panels"
        @movePanel="movePanel"
    />
  </div>
</template>

<style scoped>
.scroll_container {
  flex: 1;
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>