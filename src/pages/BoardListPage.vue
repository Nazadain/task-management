<script setup lang="ts">

import {useStore} from "vuex";
import {RootState} from "@/types";
import {computed, onMounted} from "vue";
import Icon from "@/components/UI/Icon.vue";
import Cookies from "js-cookie";
import api from "@/http/axios";

const store = useStore<RootState>();
const emit = defineEmits([
  "title",
]);

const boards = computed(() => store.getters["board/boards"]);

onMounted(async () => {
  emit("title", "Доски");
});

</script>

<template>
  <div class="scroll_container">
    <div class="board-list__container">
      <header class="board-list__header">
        Мои доски
      </header>
      <div class="board-list">
        <router-link
            v-for="board in boards"
            class="board-element"
            :key="board.id"
            :to="`/boards/${board.id}`"
        >
          <header class="board-element__header">
            <h3>{{ board.title }}</h3>
            <div
                class="icon"
                @click.stop.prevent
            >
              <Icon name="kebab" :size="20"/>
            </div>
          </header>
        </router-link>
        <div class="board-element add_item-btn">
          <Icon name="plus" :size="20"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll_container {
  flex: 1;
  overflow: auto;
  height: 100%;
  width: 100%;
}

.board-list__container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px;
}

.board-list__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-shadow: 0 0 4px 0 #90A4AE50;
  border-radius: 10px;
  background: #fff;
  font-size: 18px;
}

.board-element__header .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
}

.board-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.board-element {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px 0 #90A4AE50;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  gap: 15px;
  text-align: left;
  height: auto;
  min-height: 125px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
}

.board-element:hover {
  box-shadow: 0 0 8px 0 #90A4AE80;
}

.board-element__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
}

.board-element__header h3 {
  font-weight: normal;
}

.add_item-btn {
  align-items: center;
  justify-content: center;
}
</style>