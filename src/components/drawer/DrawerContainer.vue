<script setup lang="ts">

import DrawerContent from "@/components/drawer/DrawerContent.vue";
import Icon from "@/components/UI/Icon.vue";
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/types";
import EditTaskForm from "@/components/drawer/EditTaskForm.vue";
import EditPanelForm from "@/components/drawer/EditPanelForm.vue";
import api from "@/http/axios";

const store = useStore<RootState>();

const content = computed(() => store.state.sidebar.content);
const isActive = computed(() => store.state.sidebar.isActive);
const sidebarRef = ref<HTMLElement | null>(null);

const hideSidebar = () => {
  store.commit("sidebar/hide");
}

const submitTaskEdit = async (): Promise<void> => {
  hideSidebar();

  const id = content.value.value?.id;
  const payload = {
    title: content.value.value?.title,
    deadline: content.value.value?.deadline,
    progress: content.value.value?.progress,
    priority: content.value.value?.priority,
  }

  await api.patch(`/api/tasks/${id}`,
      payload
  );

  store.commit("task/updateTask");
}

const submitPanelEdit = async (): Promise<void> => {
  hideSidebar();


  store.commit("panel/updatePanel", content.value.value);
}

watch(() => isActive.value, (newVal) => {
  if (newVal) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideSidebar();
      }
    })
  } else {
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideSidebar();
      }
    })
  }
})

</script>

<template>
  <div
      class="drawer__container"
      :class="{active: isActive}"
      :ref="sidebarRef"
  >
    <drawer-content>
      <header class="header">
        <div class="top">
          <h2 v-if="content.type === 'task'">Редактировать задачу</h2>
          <h2 v-else>Редактировать колонку</h2>
          <div class="icon" @click="hideSidebar">
            <Icon name="cross"/>
          </div>
        </div>
        <hr>
      </header>

      <edit-task-form
          v-if="content.type === 'task'"
          :content="content"
          @submitForm="submitTaskEdit"
      />

      <edit-panel-form
          v-if="content.type === 'panel'"
          :content="content"
          @submitForm="submitPanelEdit"
      />
    </drawer-content>
  </div>
</template>

<style scoped>
.drawer__container {
  position: absolute;
  top: 0;
  right: -30%;
  width: 30%;
  height: 100%;
  padding: 25px;
  background: #FFFFFF;
  transition: 0.2s;
}

.drawer__container .header {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
}

.drawer__container .header .top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.drawer__container .header .top .icon {
  cursor: pointer;
}

.active {
  right: 0 !important;
}

@media (max-width: 768px) {
  .drawer__container {
    width: 95%;
    right: -95%;
  }
}
</style>