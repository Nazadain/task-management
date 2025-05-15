<script setup lang="ts">

</script>

<template>
<div class="board-add__wrapper">
  <div class="board-add_container">
    <button class="close_modal">X</button>
    <form class="add_form">
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

      <button class="submit-btn">
        Создать доску
      </button>
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
  background: #11111140;
  z-index: 2000;
}

.board-add_container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background: #FFFFFF;
  border-radius: 10px;
}

.board-add_container .close_modal {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 #90A4AE50;
}

.add_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.add_form h2 {
  margin-bottom: 10px;
}

.add_form .form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.add_form .form-item label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 16px;
}

.add_form .form-input {
  padding: 8px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #90A4AE;
  outline: none;
  width: 100%;
}

.add_form .submit-btn {
  background: #E7E7FF;
  color: #6F72FF;
  cursor: pointer;
  border: none;
  font-size: 18px;
  padding: 8px 10px;
  border-radius: 10px;
  width: 100%;
  margin-top: 25px;
}
</style>