<template>
  <div class="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 animate-fade-in">
    <div class="flex items-start gap-3">
      <!-- Checkbox -->
      <button
        @click="$emit('toggle', todo.id)"
        class="flex-shrink-0 w-5 h-5 mt-0.5 border-2 rounded transition-all duration-200"
        :class="[
          todo.completed 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-gray-400'
        ]"
      >
        <svg v-if="todo.completed" class="w-3 h-3 m-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex-1 min-w-0">
        <!-- Title -->
        <h3 
          class="font-medium text-gray-900 mb-1 transition-all duration-200"
          :class="{ 'line-through text-gray-500': todo.completed }"
        >
          {{ todo.title }}
        </h3>

        <!-- Description -->
        <p 
          v-if="todo.description" 
          class="text-sm text-gray-600 mb-2"
          :class="{ 'line-through': todo.completed }"
        >
          {{ todo.description }}
        </p>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- Status Badge -->
            <span 
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :style="{
                backgroundColor: statusConfig[todo.status].bgColor,
                color: statusConfig[todo.status].textColor
              }"
            >
              {{ statusConfig[todo.status].label }}
            </span>

            <!-- Due Date -->
            <span v-if="todo.dueDate" class="text-xs text-gray-500 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(todo.dueDate) }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              @click="$emit('edit', todo)"
              class="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click="$emit('delete', todo.id)"
              class="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  statusConfig: Record<string, any>;
}

defineProps<Props>();

defineEmits<{
  toggle: [id: string];
  edit: [todo: Todo];
  delete: [id: string];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });
};
</script>