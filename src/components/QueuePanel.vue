<template>
  <div class="queue-panel aletheia-panel h-full overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Queue
      </h3>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ stats.pending }} pending · {{ stats.completed }} completed
      </div>
      
      <!-- Progress Bar -->
      <div class="mt-3 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          class="bg-aletheia-primary h-2 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="activeFilter = filter.value"
        :class="[
          'flex-1 px-4 py-2 text-sm font-medium transition-colors',
          activeFilter === filter.value
            ? 'text-aletheia-primary border-b-2 border-aletheia-primary'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
        ]"
      >
        {{ filter.label }} ({{ filter.count }})
      </button>
    </div>

    <!-- Item List -->
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        @click="emit('select', item.id)"
        :class="[
          'p-3 mb-2 rounded-lg cursor-pointer transition-all',
          'border border-gray-200 dark:border-gray-700',
          currentItemId === item.id
            ? 'bg-aletheia-primary bg-opacity-10 border-aletheia-primary ring-2 ring-aletheia-primary ring-opacity-50'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        ]"
      >
        <!-- Item Header -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-gray-500 dark:text-gray-400">
              #{{ item.id.substring(0, 8) }}
            </span>
            <!-- Status Indicator -->
            <span
              v-if="item.status"
              :class="[
                'text-xs px-1.5 py-0.5 rounded',
                item.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                item.status === 'skipped' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                item.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              ]"
            >
              {{ item.status }}
            </span>
          </div>
          <span
            v-if="item.pillar"
            :class="[
              'aletheia-badge',
              `aletheia-badge-${item.pillar}`
            ]"
          >
            {{ item.pillar }}
          </span>
        </div>

        <!-- Item Preview -->
        <div class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-1">
          {{ item.input.substring(0, 120) }}{{ item.input.length > 120 ? '...' : '' }}
        </div>

        <!-- Item Footer -->
        <div class="mt-2 flex items-center justify-between text-xs">
          <span class="text-gray-500 dark:text-gray-400">
            {{ new Date().toLocaleDateString() }}
          </span>
          <span
            v-if="item.qualityScore"
            :class="[
              'font-medium px-2 py-0.5 rounded',
              item.qualityScore >= 0.8 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
              item.qualityScore >= 0.6 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
              'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            ]"
          >
            {{ Math.round(item.qualityScore * 100) }}%
          </span>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredItems.length === 0"
        class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400"
      >
        <svg
          class="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-sm">No {{ activeFilter }} items</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { AletheiaItem, AletheiaStats } from '../types';

interface Props {
  items: AletheiaItem[];
  stats: AletheiaStats;
  progress: number;
  currentItemId?: string | null;
}

interface Emits {
  (e: 'select', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const activeFilter = ref<'pending' | 'completed' | 'skipped'>('pending');

const filters = computed(() => [
  { value: 'pending' as const, label: 'Pending', count: props.stats.pending },
  { value: 'completed' as const, label: 'Completed', count: props.stats.completed },
  { value: 'skipped' as const, label: 'Skipped', count: props.stats.skipped },
]);

const filteredItems = computed(() => {
  return props.items.filter(item => {
    if (activeFilter.value === 'pending') {
      return item.status === 'pending' || item.status === 'in-progress' || !item.status;
    }
    return item.status === activeFilter.value;
  });
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
