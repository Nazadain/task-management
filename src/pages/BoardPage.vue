<script setup lang="ts">
import TaskBoard from "@/components/task/TaskBoard.vue";
import {useRoute} from "vue-router";
import {computed, nextTick, onMounted, watch} from "vue";
import {useStore} from "vuex";
import {Board, RootState} from "@/types";

const route = useRoute();
const emit = defineEmits([
    "title",
]);

const store = useStore<RootState>();

const boards = computed(() => store.getters["board/boards"])
const boardId = computed(() => Number(route.params.id));
const board = computed<Board | undefined>(() => {
  return boards.value.find((b: Board) => b.id === boardId.value);
});

onMounted(async () => {
  await nextTick();
  if (board.value) {
    emit("title", board.title);
  }
})

watch(board, (newBoard: Board | undefined) => {
  if (newBoard !== undefined) {
    emit("title", newBoard.title);
  }
}, {immediate: true});

</script>

<template>
  <div class="scroll_container">
    <task-board/>
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