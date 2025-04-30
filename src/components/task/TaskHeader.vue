<script setup lang="ts">
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import Icon from "@/components/UI/Icon.vue";
import {ref} from "vue";
import DropdownBtn from "@/components/UI/DropdownBtn.vue";

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
      <dropdown-btn icon="edit">
        Редактировать
      </dropdown-btn>
      <dropdown-btn
          icon="delete"
          color="#FF4828"
          @click="deleteTask"
      >
        Удалить
      </dropdown-btn>
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
</style>