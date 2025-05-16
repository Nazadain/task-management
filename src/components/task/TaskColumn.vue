<script setup lang="ts">
import {Panel, Task, User} from "@/types";
import TaskCard from "@/components/task/TaskCard.vue";
import {computed, onMounted, ref, watch} from "vue";
import TaskColumnHeader from "@/components/task/TaskColumnHeader.vue";
import AddForm from "@/components/UI/AddForm.vue";
import {Content} from "@/store/drawer";
import {VueDraggableNext} from "vue-draggable-next";

interface Props {
  panel: Panel;
  tasks: Task[];
}

const props = defineProps<Props>();

defineOptions({
  name: 'panel-item'
})

const emit = defineEmits([
  "addTask",
  "deleteTask",
  "deletePanel",
  "openSidebar",
  "updateTask",
  "updateTasksOrder",
  "update:tasks",
  "setTasks",
]);

const isFormOpen = ref<boolean>(false);
const isDragDisabled = computed(() => window.innerWidth < 768);
const columnTasks = ref<Task[]>([]);

const updateColumnTasks = () => {
  columnTasks.value = props.tasks
      .filter(t => t.panel_id === props.panel.id)
      .sort((a, b) => a.position - b.position);
};

const onDragChange = (evt: any) => {
  if (evt.added) {
    const movedTask = evt.added.element;

    // movedTask.panel_id всё ещё старый — обновим его на текущий panel.id
    movedTask.panel_id = props.panel.id;

    const index = evt.added.newIndex;
    const taskList = columnTasks.value;

    const beforeTask = taskList[index - 1] ?? null;
    const afterTask = taskList[index + 1] ?? null;

    const payload = {
      before: beforeTask?.id ?? null,
      after: afterTask?.id ?? null,
      panel_id: props.panel.id,
    };

    emit("updateTasksOrder", {
      id: movedTask.id,
      newTasks: taskList,
      payload,
    });
  }
};
const addTask = (title: string): void => {
  const newTask: Task = {
    id: -1,
    title: title,
    progress: 0,
    deadline: undefined,
    priority: undefined,
    position: 0,
    panel_id: props.panel.id,
  }
  emit("addTask", newTask);
  isFormOpen.value = false;
}
const deleteTask = (id: number): void => {
  emit("deleteTask", id);
}
const deletePanel = (): void => {
  emit("deletePanel", props.panel.id);
}
const openForm = () => {
  isFormOpen.value = true;
}
const openSidebar = (): void => {
  const panel = {...props.panel};

  const content: Content = {
    value: panel,
    type: "panel",
  }
  emit("openSidebar", content);
}

const openTaskSidebar = (content: Content): void => {
  emit("openSidebar", content);
}

const users = ref<User[]>([]);

onMounted(async () => {
  updateColumnTasks();
  const response = await fetch("/users.json");
  users.value = await response.json();
});

watch(() => [props.tasks, props.panel.id], () => {
  updateColumnTasks();
}, {immediate: true});

</script>

<template>
  <div class="task__column">
    <task-column-header
        :title="panel.title"
        :color="panel.colour"
        @deletePanel="deletePanel"
        @openTaskForm="openForm"
        @openSidebar="openSidebar"
    />

    <add-form
        :show="isFormOpen"
        placeholder="Название задачи"
        @add="addTask"
        @openForm="openForm"
    >
      Добавить задачу
    </add-form>

    <VueDraggableNext
        class="board-list__container"
        :list="columnTasks"
        :disabled="isDragDisabled"
        group="tasks"
        @change="onDragChange"
    >
      <task-card
          v-for="task in columnTasks"
          :task="task"
          :panelId="panel.id"
          :color="panel.colour"
          :key="task.id"
          @openSidebar="openTaskSidebar"
          @deleteTask="deleteTask"
      />
    </VueDraggableNext>
  </div>
</template>

<style scoped>
.task__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  gap: 10px;
}

.board-list__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>