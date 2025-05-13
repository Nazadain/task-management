<script setup lang="ts">

import {onMounted} from "vue";
import {useRouter} from "vue-router";

onMounted(() => {
  const router = useRouter();
  router.push("/boards");
});

</script>

<template>

</template>

<style scoped>

</style>