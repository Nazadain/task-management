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

  <div class="status__board">
    <div class="status__board-content">

    </div>
  </div>

</template>

<style scoped>
.status__board {
  display: flex;
  background: #A78BFA;
  border-radius: 10px;
  width: 300px;
  height: 500px;
  padding: 5px 2px 2px 2px;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
}
.status__board-content {
  display: flex;
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>