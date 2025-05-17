<script setup lang="ts">

import Icon from "@/components/UI/Icon.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {IconName} from "@/assets/icons";
import {useStore} from "vuex";
import {RootState} from "@/types";

interface Props {
  name: string;
}

const props = defineProps<Props>();
const emit = defineEmits([
    "openAddBoard",
    "openEditBoard",
    "openInviteUser"
]);

const store = useStore<RootState>();
const route = useRoute();

const isBoardPage = computed<boolean>(() => route.path.includes("/boards/"));
const board = computed(() => store.getters["board/board"]);

</script>

<template>
  <div class="topbar__container">
    <div class="burger-btn">
      <Icon name="burger" :size="30"/>
    </div>
    <div class="title">
      <h1 class="page-name">{{ name }}</h1>
      <div
          v-if="isBoardPage"
          class="settings_icon"
          @click="emit('openEditBoard', board)"
      >
        <Icon
            :name="IconName.SETTINGS"
            :size="18"
        />
      </div>
    </div>

    <div
        v-if="isBoardPage"
        class="btn invite__user-btn"
        @click="emit('openInviteUser')"
    >
      <Icon name="plus" :size="16" color="#6F72FF"/>
      Пригласить
    </div>
    <div
        v-else
        class="btn add__board-btn"
        @click="emit('openAddBoard')"
    >
      <Icon name="plus" :size="16" color="#6F72FF"/>
      Доска
    </div>
  </div>
</template>

<style scoped>
.topbar__container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0 40px;
  border: 1px none #EDEEF0;
  border-bottom-style: solid;
  background: #fff;
  z-index: 1000;
}

.topbar__container .title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.topbar__container .title .settings_icon {
  cursor: pointer;
}

.topbar__container .page-name {
  font-size: 18px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topbar__container .btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #E7E7FF;
  color: #6F72FF;
  cursor: pointer;
}

.topbar__container .burger-btn {
  display: none;
}

@media (max-width: 768px) {
  .topbar__container {
    justify-content: flex-start;
    gap: 10px;
    padding: 0 15px;
  }

  .topbar__container .page-name {
    font-size: 1.2em;
  }

  .topbar__container .add__board-btn {
    display: none;
  }

  .topbar__container .burger-btn {
    display: flex;
  }
}
</style>