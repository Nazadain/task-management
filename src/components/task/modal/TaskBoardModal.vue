<script setup lang="ts">

import {IconName} from "@/assets/icons";
import Icon from "@/components/UI/Icon.vue";

const emit = defineEmits([
    "close"
]);
</script>

<template>
  <div class="board-add__wrapper">
    <div class="board-add_container">

      <div
          class="close_modal"
          @click="emit('close')"
      >
        <Icon :name="IconName.CROSS"/>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style>
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
  min-width: 400px;
}

.board-add_container .close_modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  transition: 0.2s;
  cursor: pointer;
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

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #6F72FF;
}

input:checked + .slider:before {
  transform: translateX(20px);
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