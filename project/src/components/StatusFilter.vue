<template>
  <div class="flex flex-wrap gap-2">
    <button
      @click="$emit('filter', null)"
      class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200"
      :class="[
        activeFilter === null
          ? 'bg-blue-100 text-blue-800 border border-blue-200'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
      ]"
    >
      All Tasks
      <span class="ml-1 text-xs opacity-75">({{ totalCount }})</span>
    </button>

    <button
      v-for="(config, status) in statusConfig"
      :key="status"
      @click="$emit('filter', status as TaskStatus)"
      class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2"
      :class="[activeFilter === status ? 'border' : 'hover:bg-gray-50']"
      :style="
        activeFilter === status
          ? {
              backgroundColor: config.bgColor,
              color: config.textColor,
              borderColor: config.color,
            }
          : {}
      "
    >
      <span
        class="w-2 h-2 rounded-full"
        :style="{ backgroundColor: config.color }"
      ></span>
      {{ config.label }}
      <span class="text-xs opacity-75">({{ counts[status] || 0 }})</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TaskStatus } from "../types/todo";

interface Props {
  statusConfig: Record<string, any>;
  activeFilter: TaskStatus | null;
  counts: Record<string, number>;
  totalCount: number;
}

defineProps<Props>();

defineEmits<{
  filter: [status: TaskStatus | null];
}>();
</script>
