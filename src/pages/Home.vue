<script>
import TaskCard from "@/components/UI/TaskCard.vue";

export default {
  components: {TaskCard},
  data() {
    return {
      isModalOpen: false,
      participants: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
      ]
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
  <div>
    <h1>Hello, World!</h1>

    <task-card
        title="Название задачи"
        percentage="13"
        color="#F59E0B"
        priority="1"
        deadline="1 Мая"
        :participants="participants"
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  gap: 25px;
}
</style>