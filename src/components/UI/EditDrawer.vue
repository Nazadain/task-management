<script setup lang="ts">

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/types";
import Icon from "@/components/UI/Icon.vue";

const store = useStore<RootState>();

const contentType = computed(() => store.state.sidebar.contentType);
const isSidebarVisible = computed(() => store.state.sidebar.isVisible);
const isActive = computed(() => store.state.sidebar.isActive);
const sidebarRef = ref<HTMLElement | null>(null);

const hideSidebar = () => {
  store.commit("sidebar/hide");
}

</script>

<template>
  <div
      v-if="isSidebarVisible"
      class="drawer__container"
      @click="hideSidebar"
  >
    <div
        class="drawer__container-content"
        :class="{active: isActive}"
        :ref="sidebarRef"
        @click.stop
    >
      <div
          v-if="contentType === 'task'"
          class="edit_task-container"
      >
        <header class="header">
          <h2>Редактировать задачу</h2>
          <div class="icon" @click="hideSidebar">
            <Icon name="cross" />
          </div>
        </header>
        <hr>
      </div>
      <div v-else-if="contentType === 'panel'">
        Колонка
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer__container {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #11111140;
  z-index: 1000;
}

.drawer__container-content {
  position: absolute;
  top: 0;
  right: -30%;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  padding: 25px;
  gap: 25px;
  background: #FFFFFF;
  transition: 0.2s;
}

.drawer__container-content .header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.drawer__container-content .header h2 {
  font-size: 20px;
  font-weight: 550;
}

.drawer__container-content .header .icon {
  cursor: pointer;
}

.active {
  right: 0 !important;
}
</style>