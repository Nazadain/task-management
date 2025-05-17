<script setup lang="ts">
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import Icon from "@/components/UI/Icon.vue";
import {computed, ref} from "vue";
import DropdownBtn from "@/components/UI/DropdownBtn.vue";
import {IconName} from "@/assets/icons";

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

const show = ref<boolean>(false);
const exactIconSize = computed<number>((): number => {
  if (window.innerWidth > 768) {
    return props.iconSize;
  } else {
    return 28;
  }
});

const emit = defineEmits([
  "delete",
  "open-sidebar",
]);

const deleteTask = () => {
  emit("delete")
}
const openEditSidebar = () => {
  emit("open-sidebar");
}
</script>

<template>
  <header class="header">
    <dropdown-menu v-model:show="show">
      <dropdown-btn
          icon="edit"
          @click="openEditSidebar"
      >
        Редактировать
      </dropdown-btn>
      <dropdown-btn
          :icon="IconName.PLAY"
      >
        Запустить
      </dropdown-btn>
      <dropdown-btn
          :icon="IconName.DELETE"
          color="#FF4828"
          @click="deleteTask"
      >
        Удалить
      </dropdown-btn>
    </dropdown-menu>

    <p class="title">{{ title }}</p>
    <div class="kebab-menu">
      <Icon
          :name="IconName.KEBAB"
          :size="exactIconSize"
          @click.stop="show = !show"
      />
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

@media (max-width: 768px) {
  .header .title {
    font-size: 22px;
  }
}
</style>