<script setup lang="ts">
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import Icon from "@/components/UI/Icon.vue";
import {ref} from "vue";

interface Props {
  title: string;
  iconSize?: number;
}
const props = withDefaults(defineProps<Props>(), {
  iconSize: 24
});

defineOptions({
  name: 'card-header',
});

const show = ref(false);

const emit = defineEmits({});

const deleteTask = () => {
  emit("delete")
}
</script>

<template>
<header class="header">
  <dropdown-menu v-model:show="show">
    <div class="btn">
      <Icon name="edit" :size="20" />
      Редактировать
    </div>
    <div class="btn" @click="deleteTask">
      <Icon name="delete" :size="20" />
      Удалить
    </div>
  </dropdown-menu>
  <p class="title">{{ title }}</p>
  <div class="kebab-menu">
    <Icon name="kebab" :size="iconSize" @click="show = !show"/>
  </div>
</header>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  width: 100%;
  overflow-wrap: anywhere;
  word-break: normal;
}

.header .title {
  margin: 0;
}

.header .kebab-menu {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 5px;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
}

.btn:hover {
  background: #F5F5F9;
  transition: 0.2s;
}
</style>