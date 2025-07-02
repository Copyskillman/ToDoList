<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md animate-slide-up">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ isEditing ? 'Edit Task' : 'Add New Task' }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter task title..."
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter task description..."
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
              <option value="no-status">No Status</option>
            </select>
          </div>

          <!-- Due Date -->
          <div>
            <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              v-model="form.dueDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              {{ isEditing ? 'Update' : 'Create' }} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Todo, TaskStatus } from '../types/todo';

interface Props {
  todo?: Todo | null;
}

interface FormData {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  completed: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  submit: [data: FormData];
}>();

const isEditing = ref(!!props.todo);

const form = ref<FormData>({
  title: '',
  description: '',
  status: 'todo',
  dueDate: '',
  completed: false
});

// Initialize form with todo data if editing
watch(() => props.todo, (todo) => {
  if (todo) {
    form.value = {
      title: todo.title,
      description: todo.description || '',
      status: todo.status,
      dueDate: todo.dueDate || '',
      completed: todo.completed
    };
    isEditing.value = true;
  } else {
    form.value = {
      title: '',
      description: '',
      status: 'todo',
      dueDate: '',
      completed: false
    };
    isEditing.value = false;
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!form.value.title.trim()) return;
  
  const submitData = {
    ...form.value,
    title: form.value.title.trim(),
    description: form.value.description.trim() || undefined
  };
  
  emit('submit', submitData);
};
</script>