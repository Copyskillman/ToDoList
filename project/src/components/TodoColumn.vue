<template>
  <div class="bg-gray-50 rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span 
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: statusConfig[status].color }"
        ></span>
        <h3 class="font-semibold text-gray-900">
          {{ statusConfig[status].label }}
        </h3>
        <span class="text-sm text-gray-500 bg-white px-2 py-0.5 rounded">
          {{ todos.length }}
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :status-config="statusConfig"
        @toggle="$emit('toggle', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
      
      <div v-if="todos.length === 0" class="text-center py-8 text-gray-500">
        <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-sm">No tasks yet</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import type { Todo, TaskStatus } from '../types/todo';

interface Props {
  status: TaskStatus;
  todos: Todo[];
  statusConfig: Record<string, any>;
}

defineProps<Props>();

defineEmits<{
  toggle: [id: string];
  edit: [todo: Todo];
  delete: [id: string];
}>();
</script>