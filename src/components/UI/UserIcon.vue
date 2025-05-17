<script setup lang="ts">

import {useStore} from "vuex";
import {RootState, User} from "@/types";
import {compile, computed} from "vue";

interface Props {
  size?: number;
  user: User;
}

const props = withDefaults(defineProps<Props>(), {
  size: 20
});

const firstLetter = computed(() =>
    props.user.name.charAt(0).toUpperCase());

</script>

<template>
  <div
      class="user__icon"
      :style="`width:${size}px; height:${size}px; font-size:${size / 2}px;`"
  >
    {{ firstLetter }}
  </div>
</template>

<style scoped>
.user__icon {
  display: flex;
  background: #F5F5F9;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
}
</style>