<script setup lang="ts">

import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import Icon from "@/components/UI/Icon.vue";
import {ref} from "vue";
import DropdownBtn from "@/components/UI/DropdownBtn.vue";
import {useStore} from "vuex";
import {RootState} from "@/types";

interface Props {
  color?: string,
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'currentColor',
});

const emit = defineEmits([
    "deletePanel",
    "openTaskForm",
    "openSidebar"
]);

const show = ref(false);

const deletePanel = (): void => {
  emit("deletePanel");
}
const openTaskForm = () => {
  emit("openTaskForm");
}
const openEditSidebar = () => {
  emit("openSidebar")
}
</script>

<template>
  <header class="header">
    <dropdown-menu v-model:show="show">
      <dropdown-btn
          icon="plus"
          @click="openTaskForm"
      >
        Добавить задачу
      </dropdown-btn>
      <dropdown-btn
          icon="edit"
          @click="openEditSidebar"
      >
        Редактировать
      </dropdown-btn>
      <dropdown-btn
          icon="delete"
          color="#FF4828"
          @click="deletePanel"
      >
        Удалить
      </dropdown-btn>
    </dropdown-menu>
    <div class="title">
      <div class="point" :style="`background: ${props.color}`"></div>
      {{ title }}
    </div>
    <div
        class="icon"
        @click="show = !show"
    >
      <Icon name="kebab" :size="24"/>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  font-size: 18px;
}

.header .title .point {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}

.header .icon {
  cursor: pointer;
}
</style>