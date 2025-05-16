<script setup lang="ts">
import TaskBoard from "@/components/task/TaskBoard.vue";
import {useRoute} from "vue-router";
import {computed, onBeforeMount, onMounted, watch} from "vue";
import {useStore} from "vuex";
import {Board, Panel, RootState} from "@/types";
import echo from "@/services/echo";

const route = useRoute();
const emit = defineEmits(["title"]);
const store = useStore<RootState>();

const id = computed<Number>(() => Number(route.params.id));
const board = computed<Board>(() => store.getters["board/board"]);
const panels = computed<Panel[]>(() => store.getters["panel/panels"]);

const movePanel = (data: any) => {
  store.commit("panel/updatePanel");
}

onBeforeMount(async () => {
  await store.dispatch("board/fetchBoard", id.value);
});

watch(id, async (newId) => {
  await store.dispatch("board/fetchBoard", newId);
});

onMounted(() => {
  // echo.private(`board.${id.value}`)
  //     .listen('.panel_created', (e: any) => {
  //       console.log(`ПАНЕЛЬ СОЗДАНА:`, e);
  //     });
});

watch(board, (newBoard) => {
  if (newBoard) {
    emit("title", newBoard.title);
  }
}, {immediate: true});
</script>

<template>
  <div class="scroll_container">
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