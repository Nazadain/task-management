<script setup lang="ts">

import UserIcon from "@/components/UI/UserIcon.vue";
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
import DropdownBtn from "@/components/UI/DropdownBtn.vue";
import {User} from "@/types";
import {ref} from "vue";

interface Props {
  user: User;
}

defineProps<Props>();

const emit = defineEmits([
    "logout"
]);

const show = ref<boolean>(false);

</script>

<template>
  <div class="user__container">
    <dropdown-menu :show="show" @click="show=false">
      <dropdown-btn icon="settings">Настройки</dropdown-btn>
      <dropdown-btn
          icon="logout"
          @click="emit('logout')"
      >
        Выйти
      </dropdown-btn>
    </dropdown-menu>
    <div class="user__profile" @click.stop="show=true">
      <UserIcon :size="35" :user="user" />
      <div
          v-if="user"
          class="user-info">
        <h3 class="username">{{ user.name }}</h3>
        <p class="email">{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user__container {
  position: relative;
  display: flex;
}

.user__container .user__profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 6px;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;
}

.user__container .user__profile:hover {
  background: #F5F5F9;
  transition: 0.2s;
}

.user__container .user__profile .user-info .username {
  font-size: clamp(1rem, 1vw, 3rem);
  text-align: left;
}

.user__container .user__profile .user-info .email {
  font-size: clamp(0.8rem, 0.9vw, 2rem);
  color: #90A4AE;
  text-align: left;
}
</style>