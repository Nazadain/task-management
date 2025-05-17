<script setup lang="ts">

import {useStore} from "vuex";
import {RootState, User} from "@/types";
import {computed} from "vue";

interface Props {
  size?: number;
}

withDefaults(defineProps<Props>(), {
  size: 20
});

const store = useStore<RootState>();

const user = computed<User>(() => store.getters["user"]);
const userLetter = computed(() => {
  if (!user.value) return "";
  return user.value.name.charAt(0).toUpperCase();
});

</script>

<template>
  <div
      class="user__icon"
      :style="`width:${size}px; height:${size}px;`"
  >
    {{ userLetter }}
  </div>
</template>

<style scoped>
.user__icon {
  display: flex;
  background: #F5F5F9;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>