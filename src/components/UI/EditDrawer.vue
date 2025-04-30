<script setup lang="ts">

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/types";

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
      <div v-if="contentType === 'task'">
        Задача
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

.drawer__container .drawer__container-content {
  position: absolute;
  top: 0;
  right: -30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background: #FFFFFF;
  width: 30%;
  transition: 0.2s;
}

.active {
  right: 0 !important;
}
</style>