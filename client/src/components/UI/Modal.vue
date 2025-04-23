<script>
export default {
  name: 'ui-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<template>
  <div class="modal" v-if="show" @click.stop="hideModal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal__content {
  margin: auto;
  background: #FFFFFF;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
}
</style>