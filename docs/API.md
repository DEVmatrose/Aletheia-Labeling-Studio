# 📘 Aletheia Labeling Studio - API Reference

Complete API documentation for the Aletheia Labeling Studio components.

---

## Table of Contents

- [AletheiaLabeler Component](#aletheialabeler-component)
  - [Props](#props)
  - [Events](#events)
  - [Slots](#slots)
- [TypeScript Interfaces](#typescript-interfaces)
  - [AletheiaItem](#aletheiaitem)
  - [AletheiaConfig](#aletheiaconfig)
  - [AletheiaStats](#aletheia-stats)
  - [AletheiaValidation](#aletheiavalidation)
- [Composables](#composables)
  - [useAletheia](#usealetheia)
- [CSS Classes](#css-classes)
- [Examples](#examples)

---

## AletheiaLabeler Component

The main orchestrator component that provides the complete labeling interface.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `AletheiaItem[]` | ✅ Yes | `[]` | Array of items to be labeled and reviewed |
| `config` | `AletheiaConfig` | ❌ No | `{}` | Configuration object for validation rules and UI options |
| `loading` | `boolean` | ❌ No | `false` | Display loading overlay when fetching data |

#### Props Details

**`items` (AletheiaItem[])**

Array of labeling items. Each item must have at minimum:
- `id` (string) - Unique identifier
- `input` (string) - Model input/prompt
- `output` (any) - Model output (typically JSON object)

```typescript
const items = [
  {
    id: 'item-001',
    input: 'Analyze this customer feedback...',
    output: {
      sentiment: 'positive',
      category: 'feature-request',
      priority: 'high'
    },
    status: 'pending',
    qualityScore: 0.85
  }
];
```

**`config` (AletheiaConfig)**

Configuration object for customizing behavior:

```typescript
const config = {
  // Array of pillar/category names
  pillars: ['technical', 'research', 'business'],
  
  // Validation rules per pillar
  validations: {
    research: {
      requireCitation: true,        // Require source citation
      minQualityScore: 0.9,         // Minimum quality threshold
      customMessage: 'Research data requires peer-reviewed sources'
    },
    business: {
      minQualityScore: 0.8,
      requiresReviewer: 'manager'   // Custom reviewer type
    }
  },
  
  // UI options
  allowEdit: true,                  // Allow JSON editing (default: true)
  enableKeyboardShortcuts: true,    // Enable keyboard navigation (default: true)
  theme: 'default',                 // Custom theme name
  
  // Display options
  showProgressBar: true,            // Show progress bar (default: true)
  showStats: true,                  // Show statistics (default: true)
};
```

**`loading` (boolean)**

Shows a loading overlay with spinner. Use when fetching data from backend:

```vue
<AletheiaLabeler
  :items="trainingItems"
  :loading="isLoadingData"
/>
```

---

### Events

The component emits events for all user actions. Implement handlers in your parent component to persist changes.

| Event | Payload | Description |
|-------|---------|-------------|
| `save` | `AletheiaItem` | User approved and saved an item |
| `validate` | `AletheiaItem, boolean, string?` | Validation result (item, isValid, errorMessage) |
| `skip` | `AletheiaItem` | User skipped an item |
| `select` | `string` | User selected an item by ID |
| `update:currentItem` | `AletheiaItem` | Current item changed |

#### Event Details

**`@save` Event**

Emitted when user clicks "Approve & Save" button. The item includes all user modifications:

```vue
<AletheiaLabeler
  @save="handleSave"
/>
```

```typescript
function handleSave(item: AletheiaItem) {
  console.log('Approved item:', item.id);
  console.log('Edited output:', item.output);
  console.log('Quality score:', item.qualityScore);
  console.log('Selected pillar:', item.pillar);
  
  // Save to your backend
  await api.updateTrainingData({
    id: item.id,
    output: item.output,
    pillar: item.pillar,
    qualityScore: item.qualityScore,
    reviewedBy: currentUser.id,
    usedForTraining: true
  });
  
  // Show success message
  toast.success('Training data approved!');
}
```

**`@validate` Event**

Emitted when user clicks "Validate Data" button or when validation is triggered automatically:

```typescript
function handleValidate(
  item: AletheiaItem, 
  isValid: boolean, 
  message?: string
) {
  if (!isValid) {
    alert(`Validation failed: ${message}`);
    return;
  }
  
  console.log('Item passed validation:', item.id);
}
```

**Common validation errors:**
- Quality score not set (0-100%)
- Pillar not selected
- Scientific pillar missing citation
- Psychological pillar missing neutrality check
- Invalid JSON syntax in output

**`@skip` Event**

Emitted when user clicks "Skip for Now" button:

```typescript
function handleSkip(item: AletheiaItem) {
  console.log('Skipped item:', item.id);
  
  // Mark as skipped in backend
  await api.updateTrainingData({
    id: item.id,
    status: 'skipped',
    reviewerNotes: 'Needs further clarification'
  });
}
```

**`@select` Event**

Emitted when user clicks an item in the queue panel:

```typescript
function handleSelect(itemId: string) {
  console.log('User selected item:', itemId);
  
  // Optional: Track analytics
  analytics.track('item_selected', { itemId });
}
```

---

### Slots

Currently no slots are exposed. All UI elements are internally managed for consistency. Future versions may support:
- Header slot (custom branding)
- Footer slot (additional actions)
- Empty state slot (custom no-items message)

---

## TypeScript Interfaces

### AletheiaItem

Core data structure for labeling items:

```typescript
interface AletheiaItem {
  /** Unique identifier (required) */
  id: string;
  
  /** Model input/prompt (required) */
  input: string;
  
  /** Model output - any JSON structure (required) */
  output: any;
  
  /** Optional category/type classification */
  category?: string;
  
  /** Optional pillar assignment */
  pillar?: AletheiaPillar;
  
  /** Additional custom metadata */
  metadata?: Record<string, any>;
  
  /** Workflow status */
  status?: AletheiaStatus;
  
  /** ISO timestamp */
  timestamp?: string;
  
  /** Quality score (0-1 or 0-100) */
  qualityScore?: number;
}
```

**Type Aliases:**

```typescript
type AletheiaStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';
type AletheiaPillar = 'technical' | 'research' | 'business' | string;
```

**Example Usage:**

```typescript
const item: AletheiaItem = {
  id: 'fb-001',
  input: 'Customer said: "The new search is amazing!"',
  output: {
    sentiment: 'positive',
    category: 'feature-praise',
    actionable: false
  },
  category: 'customer-feedback',
  pillar: 'business',
  status: 'pending',
  timestamp: '2025-12-01T10:30:00Z',
  qualityScore: 0.92,
  metadata: {
    source: 'email',
    customerId: 'cust-12345'
  }
};
```

---

### AletheiaConfig

Configuration interface for customizing behavior:

```typescript
interface AletheiaConfig {
  /** Array of pillar/category names */
  pillars?: string[];
  
  /** Validation rules per pillar */
  validations?: Record<string, AletheiaValidation>;
  
  /** Custom theme name */
  theme?: string;
  
  /** Allow editing output JSON */
  allowEdit?: boolean;
  
  /** Enable keyboard shortcuts */
  enableKeyboardShortcuts?: boolean;
  
  /** Show progress bar */
  showProgressBar?: boolean;
  
  /** Show statistics */
  showStats?: boolean;
}
```

---

### AletheiaStats

Statistics interface for queue progress:

```typescript
interface AletheiaStats {
  /** Total number of items */
  total: number;
  
  /** Items awaiting review */
  pending: number;
  
  /** Items successfully completed */
  completed: number;
  
  /** Items skipped for later */
  skipped: number;
  
  /** Items currently being reviewed */
  inProgress: number;
  
  /** Average quality score (0-1) */
  averageQuality?: number;
}
```

**Example:**

```typescript
const stats: AletheiaStats = {
  total: 175,
  pending: 142,
  completed: 28,
  skipped: 5,
  inProgress: 0,
  averageQuality: 0.87
};

// Progress percentage
const progress = Math.round(
  ((stats.completed + stats.skipped) / stats.total) * 100
); // 18%
```

---

### AletheiaValidation

Validation rules for a specific pillar:

```typescript
interface AletheiaValidation {
  /** Require source citation (text field) */
  requireCitation?: boolean;
  
  /** Minimum quality score threshold (0-1) */
  minQualityScore?: number;
  
  /** Require neutrality confirmation (checkbox) */
  neutralityCheck?: boolean;
  
  /** Custom validation message */
  customMessage?: string;
  
  /** Required reviewer type */
  requiresReviewer?: string;
}
```

---

## Composables

### useAletheia

Composable for managing labeling state. Used internally by components, but can be used standalone:

```typescript
import { useAletheia } from 'aletheia-labeling-studio';
import type { AletheiaItem, AletheiaConfig } from 'aletheia-labeling-studio';

const items: AletheiaItem[] = [...];
const config: AletheiaConfig = {...};

const {
  // State
  currentItem,         // ref<AletheiaItem | null>
  currentIndex,        // ref<number>
  loading,             // ref<boolean>
  
  // Computed
  pendingItems,        // ComputedRef<AletheiaItem[]>
  completedItems,      // ComputedRef<AletheiaItem[]>
  skippedItems,        // ComputedRef<AletheiaItem[]>
  stats,               // ComputedRef<AletheiaStats>
  progress,            // ComputedRef<number> (0-100%)
  hasNext,             // ComputedRef<boolean>
  hasPrevious,         // ComputedRef<boolean>
  
  // Methods
  loadNext,            // () => void
  loadPrevious,        // () => void
  selectItem,          // (id: string) => void
  updateOutput,        // (newOutput: any) => void
  updatePillar,        // (pillar: string) => void
  updateQualityScore,  // (score: number) => void
  updateMetadata,      // (key: string, value: any) => void
  validateItem,        // (item: AletheiaItem) => { isValid: boolean, message?: string }
  saveItem,            // (item: AletheiaItem) => void
  skipItem,            // (item: AletheiaItem) => void
} = useAletheia(items, config);
```

**Example: Custom Queue Implementation**

```vue
<template>
  <div>
    <h2>Custom Queue ({{ pendingItems.length }} pending)</h2>
    <ul>
      <li 
        v-for="item in pendingItems" 
        :key="item.id"
        @click="selectItem(item.id)"
      >
        {{ item.id }} - Quality: {{ item.qualityScore }}
      </li>
    </ul>
    
    <div v-if="currentItem">
      <h3>Editing: {{ currentItem.id }}</h3>
      <textarea v-model="currentItem.output" />
      <button @click="saveItem(currentItem)">Save</button>
      <button @click="skipItem(currentItem)">Skip</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAletheia } from 'aletheia-labeling-studio';

const items = [...]; // Your data
const { 
  currentItem, 
  pendingItems, 
  selectItem, 
  saveItem, 
  skipItem 
} = useAletheia(items);
</script>
```

---

## CSS Classes

Aletheia uses Tailwind CSS internally. Custom theme classes:

### Colors

```css
/* Primary color (blue) */
.aletheia-primary { color: #3B82F6; }
.bg-aletheia-primary { background-color: #3B82F6; }
.border-aletheia-primary { border-color: #3B82F6; }

/* Success color (green) */
.aletheia-success { color: #10B981; }
.bg-aletheia-success { background-color: #10B981; }

/* Warning color (yellow) */
.aletheia-warning { color: #F59E0B; }
.bg-aletheia-warning { background-color: #F59E0B; }

/* Danger color (red) */
.aletheia-danger { color: #EF4444; }
.bg-aletheia-danger { background-color: #EF4444; }
```

### Component Classes

```css
/* Container */
.aletheia-container { /* 3-column grid layout */ }

/* Queue Panel */
.aletheia-queue-panel { /* Left column */ }
.aletheia-queue-item { /* Individual queue item */ }
.aletheia-queue-item--active { /* Selected item */ }

/* Editor Panel */
.aletheia-editor-panel { /* Center column */ }
.aletheia-json-editor { /* JSON textarea */ }
.aletheia-json-editor--valid { border-color: #10B981; }
.aletheia-json-editor--invalid { border-color: #EF4444; }

/* Validation Panel */
.aletheia-validation-panel { /* Right column */ }
.aletheia-quality-slider { /* Quality score slider */ }
.aletheia-pillar-select { /* Pillar dropdown */ }
```

### Override Styles

```vue
<style>
/* Override primary color */
:root {
  --aletheia-primary: #6366F1; /* Indigo instead of blue */
}

/* Override button styles */
.aletheia-button-primary {
  background-color: var(--aletheia-primary);
  border-radius: 0.5rem;
  font-weight: 600;
}
</style>
```

---

## Examples

### Basic Integration

```vue
<template>
  <AletheiaLabeler
    :items="items"
    :config="config"
    @save="handleSave"
    @skip="handleSkip"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import 'aletheia-labeling-studio/style.css';
import type { AletheiaItem, AletheiaConfig } from 'aletheia-labeling-studio';

const items = ref<AletheiaItem[]>([
  {
    id: '1',
    input: 'Customer feedback: Great product!',
    output: { sentiment: 'positive', score: 0.95 }
  }
]);

const config: AletheiaConfig = {
  pillars: ['feedback', 'review'],
  allowEdit: true
};

function handleSave(item: AletheiaItem) {
  console.log('Saved:', item);
}

function handleSkip(item: AletheiaItem) {
  console.log('Skipped:', item);
}
</script>
```

### Advanced Configuration

```vue
<script setup lang="ts">
const config: AletheiaConfig = {
  pillars: ['technical', 'psychological', 'scientific'],
  
  validations: {
    psychological: {
      neutralityCheck: true,
      minQualityScore: 0.85,
      customMessage: 'Psychological data requires neutrality confirmation',
      requiresReviewer: 'psychologist'
    },
    scientific: {
      requireCitation: true,
      minQualityScore: 0.9,
      customMessage: 'Scientific data must include peer-reviewed sources'
    }
  },
  
  allowEdit: true,
  enableKeyboardShortcuts: true,
  showProgressBar: true,
  showStats: true,
  theme: 'dreammall'
};
</script>
```

### Backend Integration (Supabase)

```typescript
import { supabase } from '@/lib/supabase';
import type { AletheiaItem } from 'aletheia-labeling-studio';

// Load pending items
async function loadPendingItems() {
  const { data, error } = await supabase
    .from('training_data')
    .select('*')
    .eq('used_for_training', false)
    .order('timestamp', { ascending: false })
    .limit(50);

  if (!error && data) {
    return data.map(transformToAletheiaItem);
  }
}

// Transform database row to AletheiaItem
function transformToAletheiaItem(row: any): AletheiaItem {
  return {
    id: row.id,
    input: row.input_text,
    output: row.corrected_output,
    pillar: row.pillar,
    category: row.task_type,
    status: 'pending',
    timestamp: row.timestamp,
    qualityScore: row.quality_score,
    metadata: {
      reviewedBy: row.reviewed_by
    }
  };
}

// Save approved item
async function handleSave(item: AletheiaItem) {
  const { error } = await supabase
    .from('training_data')
    .update({
      corrected_output: item.output,
      pillar: item.pillar,
      quality_score: item.qualityScore,
      used_for_training: true,
      reviewed_by: user.value.id,
      timestamp: new Date().toISOString()
    })
    .eq('id', item.id);

  if (!error) {
    toast.success('Training data approved!');
    await loadPendingItems(); // Refresh queue
  }
}
```

### Keyboard Shortcuts Handler

```typescript
// Global keyboard shortcut handler
onMounted(() => {
  document.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboard);
});

function handleKeyboard(e: KeyboardEvent) {
  // Ignore if typing in input field
  if (e.target instanceof HTMLInputElement || 
      e.target instanceof HTMLTextAreaElement) {
    return;
  }

  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveCurrentItem();
  } else if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    skipCurrentItem();
  } else if (e.key === 'ArrowRight') {
    loadNextItem();
  } else if (e.key === 'ArrowLeft') {
    loadPreviousItem();
  }
}
```

---

## Support

**Issues:** https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues  
**Discussions:** https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions  
**Documentation:** https://github.com/DEVmatrose/Aletheia-Labeling-Studio/tree/main/docs

---

**Last Updated:** December 1, 2025  
**Version:** 0.1.0
