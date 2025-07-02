<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h1 class="text-2xl font-bold text-gray-900">Task List</h1>
            </div>
            <p class="text-gray-600 text-sm hidden sm:block">
              Use this template to track your personal tasks.
            </p>
          </div>
          
          <button
            @click="showForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filters -->
      <div class="mb-8 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tasks..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="viewMode"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="board">Board View</option>
              <option value="list">List View</option>
            </select>
          </div>
        </div>

        <StatusFilter
          :status-config="statusConfig"
          :active-filter="activeStatusFilter"
          :counts="statusCounts"
          :total-count="todos.length"
          @filter="handleStatusFilter"
        />
      </div>

      <!-- Board View -->
      <div v-if="viewMode === 'board'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TodoColumn
          v-for="status in statusOrder"
          :key="status"
          :status="status"
          :todos="groupedTodos[status]"
          :status-config="statusConfig"
          @toggle="toggleTodo"
          @edit="editTodo"
          @delete="handleDeleteTodo"
        />
      </div>

      <!-- List View -->
      <div v-else class="space-y-3">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :status-config="statusConfig"
          @toggle="toggleTodo"
          @edit="editTodo"
          @delete="handleDeleteTodo"
        />
        
        <div v-if="filteredTodos.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p class="text-gray-500 mb-4">Get started by creating your first task.</p>
          <button
            @click="showForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Create Task
          </button>
        </div>
      </div>
    </main>

    <!-- Todo Form Modal -->
    <TodoForm
      v-if="showForm"
      :todo="editingTodo"
      @close="closeForm"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTodos } from './composables/useTodos';
import TodoItem from './components/TodoItem.vue';
import TodoForm from './components/TodoForm.vue';
import StatusFilter from './components/StatusFilter.vue';
import TodoColumn from './components/TodoColumn.vue';
import type { Todo, TaskStatus } from './types/todo';

const {
  todos,
  filteredTodos,
  groupedTodos,
  statusConfig,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter
} = useTodos();

const showForm = ref(false);
const editingTodo = ref<Todo | null>(null);
const searchQuery = ref('');
const activeStatusFilter = ref<TaskStatus | null>(null);
const viewMode = ref<'board' | 'list'>('board');

const statusOrder: TaskStatus[] = ['todo', 'in-progress', 'done', 'no-status'];

// Update filters when search or status filter changes
watch([searchQuery, activeStatusFilter], () => {
  setFilter({
    search: searchQuery.value || undefined,
    status: activeStatusFilter.value || undefined
  });
});

const statusCounts = computed(() => {
  const counts: Record<string, number> = {};
  statusOrder.forEach(status => {
    counts[status] = groupedTodos.value[status].length;
  });
  return counts;
});

const handleStatusFilter = (status: TaskStatus | null) => {
  activeStatusFilter.value = status;
};

const editTodo = (todo: Todo) => {
  editingTodo.value = todo;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  editingTodo.value = null;
};

const handleFormSubmit = (formData: any) => {
  if (editingTodo.value) {
    updateTodo(editingTodo.value.id, formData);
  } else {
    addTodo(formData);
  }
  closeForm();
};

const handleDeleteTodo = (id: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(id);
  }
};
</script>