<script setup lang="ts">

import {computed} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/types";
import DrawerContainer from "@/components/drawer/DrawerContainer.vue";

const store = useStore<RootState>();

const isSidebarVisible = computed(() => store.state.sidebar.isVisible);

</script>

<template>
  <div
      v-if="isSidebarVisible"
      class="drawer__wrapper"
  >
    <drawer-container/>
  </div>
</template>

<style scoped>
.drawer__wrapper {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #11111140;
  z-index: 1001;
}
</style>