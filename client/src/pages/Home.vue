<script>

export default {
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    }
  }
}
</script>

<template>
  <h1>Hello, World!</h1>
  <button @click="openModal">Открыть окно</button>
  <ui-modal v-model:show="isModalOpen">
    <h3>Goodbye, world!</h3>
  </ui-modal>
</template>

<style scoped>

</style>