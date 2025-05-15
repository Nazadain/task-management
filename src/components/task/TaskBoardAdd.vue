<script setup lang="ts">

</script>

<template>
<div class="board-add__wrapper">
  <div class="board-add_container">
    <form>
      <div class="form-item">
        <label for="title">Название</label>
        <input
            id="title"
            type="text"
            name="title"
            placeholder="Введите название"
        >
      </div>

      <div class="form-item">
        <label for="description">Описание</label>
        <input
            id="description"
            type="text"
            name="description"
            placeholder="Введите описание"
        >
      </div>

      <div class="form-item">
        <label for="isPrivate">Приватная</label>
        <input
            id="isPrivate"
            type="checkbox"
            name="isPrivate"
            placeholder="Введите описание"
        >
      </div>
    </form>
  </div>
</div>
</template>

<style scoped>
.board-add__wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #11111120;
  z-index: 2000;
}

.board-add_container {
  display: flex;
  flex-direction: column;
  padding: 25px;
  background: #FFFFFF;
  border-radius: 10px;
}
</style>