import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import type { Todo, TaskStatus, TaskFilters } from '../types/todo';

export function useTodos() {
  const todos = useLocalStorage<Todo[]>('notion-todos', []);
  const filters = ref<TaskFilters>({});

  const statusConfig = {
    'todo': {
      label: 'To Do',
      color: '#6B7280',
      bgColor: '#F3F4F6',
      textColor: '#374151'
    },
    'in-progress': {
      label: 'In Progress',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      textColor: '#92400E'
    },
    'done': {
      label: 'Done',
      color: '#10B981',
      bgColor: '#D1FAE5',
      textColor: '#065F46'
    },
    'no-status': {
      label: 'No Status',
      color: '#9CA3AF',
      bgColor: '#F9FAFB',
      textColor: '#6B7280'
    }
  };

  const filteredTodos = computed(() => {
    let result = [...todos.value];

    if (filters.value.status) {
      result = result.filter(todo => todo.status === filters.value.status);
    }

    if (filters.value.completed !== undefined) {
      result = result.filter(todo => todo.completed === filters.value.completed);
    }

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(search) ||
        todo.description?.toLowerCase().includes(search)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  const groupedTodos = computed(() => {
    const groups = {
      'todo': [] as Todo[],
      'in-progress': [] as Todo[],
      'done': [] as Todo[],
      'no-status': [] as Todo[]
    };

    filteredTodos.value.forEach(todo => {
      groups[todo.status].push(todo);
    });

    return groups;
  });

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.value.push(newTodo);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value[index] = {
        ...todos.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }
  };

  const deleteTodo = (id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  };

  const toggleTodo = (id: string) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      const newCompleted = !todo.completed;
      updateTodo(id, { 
        completed: newCompleted,
        status: newCompleted ? 'done' : todo.status
      });
    }
  };

  const setFilter = (newFilters: TaskFilters) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {};
  };

  return {
    todos,
    filteredTodos,
    groupedTodos,
    filters,
    statusConfig,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearFilters
  };
}