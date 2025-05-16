<script setup lang="ts">

</script>

<template>
  <form class="add_form">
    <slot></slot>
  </form>
</template>

<style>
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

.add_form textarea {
  resize: none;
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