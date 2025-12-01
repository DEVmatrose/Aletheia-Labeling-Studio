# 🔧 Integration Guide - Aletheia Labeling Studio

Step-by-step guide for integrating Aletheia into your Vue.js project.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Configuration](#configuration)
5. [Backend Integration](#backend-integration)
   - [REST API](#rest-api)
   - [Supabase](#supabase)
   - [Firebase](#firebase)
6. [Customization](#customization)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before integrating Aletheia, ensure you have:

- **Node.js** 18+ and npm
- **Vue.js** 3.5+ project (Vite or Vue CLI)
- Basic understanding of Vue Composition API
- (Optional) Backend service for data persistence

**Check your environment:**

```bash
node --version  # Should be v18+ or v20+
npm --version   # Should be 9+ or 10+
```

**Check Vue version in your project:**

```bash
npm list vue
# Should show vue@3.5.x or higher
```

---

## Installation

### Option 1: npm (Recommended)

```bash
npm install aletheia-labeling-studio
```

### Option 2: Local Development (from source)

If you're contributing or testing local changes:

```bash
# Clone the repository
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run build:lib

# In your project
cd your-project/
npm install file:../Aletheia-Labeling-Studio
```

### Verify Installation

```bash
npm list aletheia-labeling-studio
# Should show: aletheia-labeling-studio@0.1.0
```

---

## Quick Start

### Step 1: Import Component & Styles

Create a new view or component in your Vue project:

```vue
<!-- src/views/TrainingDataReview.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Training Data Review</h1>
    
    <AletheiaLabeler
      :items="trainingItems"
      :config="config"
      :loading="loading"
      @save="handleSave"
      @validate="handleValidate"
      @skip="handleSkip"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import 'aletheia-labeling-studio/style.css';
import type { AletheiaItem, AletheiaConfig } from 'aletheia-labeling-studio';

// Your training data
const trainingItems = ref<AletheiaItem[]>([]);
const loading = ref(false);

// Configuration
const config: AletheiaConfig = {
  pillars: ['technical', 'research', 'business'],
  allowEdit: true,
  enableKeyboardShortcuts: true,
};

// Event handlers
function handleSave(item: AletheiaItem) {
  console.log('Approved:', item);
  // TODO: Save to backend
}

function handleValidate(item: AletheiaItem, isValid: boolean, message?: string) {
  if (!isValid) {
    alert(`Validation error: ${message}`);
  }
}

function handleSkip(item: AletheiaItem) {
  console.log('Skipped:', item);
  // TODO: Mark as skipped in backend
}
</script>
```

### Step 2: Add Route (Optional)

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/training-review',
    name: 'TrainingReview',
    component: () => import('@/views/TrainingDataReview.vue'),
    meta: {
      requiresAuth: true,  // If using authentication
      roles: ['admin', 'reviewer']
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### Step 3: Load Sample Data

For testing, create some mock data:

```typescript
// src/data/mockTrainingData.ts
import type { AletheiaItem } from 'aletheia-labeling-studio';

export const mockItems: AletheiaItem[] = [
  {
    id: 'item-001',
    input: 'Customer feedback: The new search feature is amazing!',
    output: {
      sentiment: 'positive',
      category: 'feature-praise',
      actionable: false
    },
    status: 'pending',
    qualityScore: 0.85,
    category: 'customer-feedback',
    pillar: 'business'
  },
  {
    id: 'item-002',
    input: 'Bug report: Export function crashes on large datasets',
    output: {
      sentiment: 'negative',
      category: 'bug-report',
      priority: 'high',
      actionable: true
    },
    status: 'pending',
    qualityScore: 0.78,
    category: 'customer-feedback',
    pillar: 'technical'
  }
];
```

**Use in component:**

```typescript
import { mockItems } from '@/data/mockTrainingData';

onMounted(() => {
  trainingItems.value = mockItems;
});
```

---

## Configuration

### Basic Configuration

```typescript
const config: AletheiaConfig = {
  // Define categories/pillars for classification
  pillars: ['technical', 'research', 'business'],
  
  // Allow users to edit JSON output
  allowEdit: true,
  
  // Enable keyboard shortcuts (Ctrl+S, arrows, etc.)
  enableKeyboardShortcuts: true,
  
  // Show progress bar at top
  showProgressBar: true,
  
  // Show statistics (total, pending, completed)
  showStats: true,
};
```

### Advanced Configuration with Validations

```typescript
const config: AletheiaConfig = {
  pillars: ['technical', 'psychological', 'scientific'],
  
  // Pillar-specific validation rules
  validations: {
    psychological: {
      // Require neutrality checkbox
      neutralityCheck: true,
      
      // Minimum quality score (0-1)
      minQualityScore: 0.85,
      
      // Custom error message
      customMessage: 'Psychological data requires neutrality confirmation',
      
      // Custom reviewer type
      requiresReviewer: 'psychologist'
    },
    
    scientific: {
      // Require source citation text field
      requireCitation: true,
      
      // Higher quality threshold
      minQualityScore: 0.9,
      
      customMessage: 'Scientific data must include peer-reviewed sources'
    },
    
    technical: {
      // Standard validation
      minQualityScore: 0.7
    }
  },
  
  allowEdit: true,
  enableKeyboardShortcuts: true,
  theme: 'custom-theme'  // Optional theme name
};
```

### Theme Customization

```vue
<style>
/* Override default colors */
:root {
  --aletheia-primary: #6366F1;    /* Indigo */
  --aletheia-success: #10B981;    /* Green */
  --aletheia-warning: #F59E0B;    /* Amber */
  --aletheia-danger: #EF4444;     /* Red */
}

/* Custom button styles */
.aletheia-button-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.aletheia-button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>
```

---

## Backend Integration

### REST API

**Step 1: Create API Service**

```typescript
// src/services/trainingDataApi.ts
import type { AletheiaItem } from 'aletheia-labeling-studio';

const API_BASE = 'https://api.yourapp.com/v1';

export async function fetchPendingItems(): Promise<AletheiaItem[]> {
  const response = await fetch(`${API_BASE}/training-data?status=pending`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch training data');
  }
  
  const data = await response.json();
  return data.items.map(transformToAletheiaItem);
}

export async function saveItem(item: AletheiaItem): Promise<void> {
  const response = await fetch(`${API_BASE}/training-data/${item.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      output: item.output,
      pillar: item.pillar,
      quality_score: item.qualityScore,
      used_for_training: true
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to save item');
  }
}

function transformToAletheiaItem(apiData: any): AletheiaItem {
  return {
    id: apiData.id,
    input: apiData.input_text,
    output: apiData.output_json,
    category: apiData.category,
    pillar: apiData.pillar,
    status: apiData.status,
    timestamp: apiData.created_at,
    qualityScore: apiData.quality_score
  };
}

function getAuthToken(): string {
  return localStorage.getItem('authToken') || '';
}
```

**Step 2: Use in Component**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPendingItems, saveItem } from '@/services/trainingDataApi';

const trainingItems = ref<AletheiaItem[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    trainingItems.value = await fetchPendingItems();
  } catch (error) {
    console.error('Failed to load data:', error);
  } finally {
    loading.value = false;
  }
});

async function handleSave(item: AletheiaItem) {
  loading.value = true;
  try {
    await saveItem(item);
    // Remove from pending list
    trainingItems.value = trainingItems.value.filter(i => i.id !== item.id);
    // Show success message
    toast.success('Item saved successfully!');
  } catch (error) {
    toast.error('Failed to save item');
  } finally {
    loading.value = false;
  }
}
</script>
```

---

### Supabase

**Step 1: Install Supabase Client**

```bash
npm install @supabase/supabase-js
```

**Step 2: Initialize Supabase**

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Step 3: Create Adapter Service**

```typescript
// src/services/aletheiaAdapter.ts
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import type { AletheiaItem } from 'aletheia-labeling-studio';

export function useAletheiaAdapter() {
  const trainingItems = ref<AletheiaItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadPendingItems() {
    loading.value = true;
    error.value = null;
    
    try {
      const { data, error: fetchError } = await supabase
        .from('kairos_training_data')
        .select('*')
        .eq('used_for_training', false)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      if (data) {
        trainingItems.value = data.map(transformToAletheiaItem);
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      console.error('Failed to load items:', e);
    } finally {
      loading.value = false;
    }
  }

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
        reviewedBy: row.reviewed_by,
        isNeutral: row.is_neutral,
        sourceCitation: row.source_citation
      }
    };
  }

  async function handleSave(item: AletheiaItem) {
    loading.value = true;
    
    try {
      const { error: updateError } = await supabase
        .from('kairos_training_data')
        .update({
          corrected_output: item.output,
          pillar: item.pillar,
          quality_score: item.qualityScore,
          used_for_training: true,
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
          timestamp: new Date().toISOString(),
          is_neutral: item.metadata?.isNeutral,
          source_citation: item.metadata?.sourceCitation
        })
        .eq('id', item.id);

      if (updateError) throw updateError;

      // Refresh list
      await loadPendingItems();
      
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to save';
      console.error('Save error:', e);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function handleSkip(item: AletheiaItem) {
    loading.value = true;
    
    try {
      const { error: updateError } = await supabase
        .from('kairos_training_data')
        .update({
          reviewer_notes: 'Skipped - needs review',
          timestamp: new Date().toISOString()
        })
        .eq('id', item.id);

      if (updateError) throw updateError;

      // Remove from current list
      trainingItems.value = trainingItems.value.filter(i => i.id !== item.id);
      
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to skip';
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    trainingItems,
    loading,
    error,
    loadPendingItems,
    handleSave,
    handleSkip
  };
}
```

**Step 4: Use in Component**

```vue
<template>
  <div>
    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <AletheiaLabeler
      :items="trainingItems"
      :config="config"
      :loading="loading"
      @save="handleSave"
      @skip="handleSkip"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import { useAletheiaAdapter } from '@/services/aletheiaAdapter';

const {
  trainingItems,
  loading,
  error,
  loadPendingItems,
  handleSave,
  handleSkip
} = useAletheiaAdapter();

const config = {
  pillars: ['technical', 'psychological', 'scientific'],
  validations: {
    psychological: { neutralityCheck: true },
    scientific: { requireCitation: true }
  }
};

onMounted(() => {
  loadPendingItems();
});
</script>
```

---

### Firebase

```typescript
// src/services/firebaseAdapter.ts
import { ref } from 'vue';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AletheiaItem } from 'aletheia-labeling-studio';

export function useFirebaseAdapter() {
  const trainingItems = ref<AletheiaItem[]>([]);
  const loading = ref(false);

  async function loadPendingItems() {
    loading.value = true;
    
    const q = query(
      collection(db, 'training_data'),
      where('usedForTraining', '==', false)
    );
    
    const snapshot = await getDocs(q);
    trainingItems.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AletheiaItem));
    
    loading.value = false;
  }

  async function handleSave(item: AletheiaItem) {
    const docRef = doc(db, 'training_data', item.id);
    await updateDoc(docRef, {
      output: item.output,
      pillar: item.pillar,
      qualityScore: item.qualityScore,
      usedForTraining: true,
      timestamp: new Date()
    });
    
    await loadPendingItems();
  }

  return { trainingItems, loading, loadPendingItems, handleSave };
}
```

---

## Customization

### Custom Validation Logic

```typescript
function handleValidate(
  item: AletheiaItem, 
  isValid: boolean, 
  message?: string
) {
  // Built-in validation
  if (!isValid) {
    toast.error(message || 'Validation failed');
    return;
  }
  
  // Custom validation: Check output structure
  if (!item.output.sentiment || !item.output.category) {
    toast.error('Output must include sentiment and category');
    return;
  }
  
  // Custom validation: Business rules
  if (item.pillar === 'scientific' && !item.metadata?.sourceCitation) {
    toast.error('Scientific data requires source citation');
    return;
  }
  
  toast.success('Validation passed!');
}
```

### Custom Keyboard Shortcuts

```typescript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.addEventListener('keydown', handleCustomShortcuts);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleCustomShortcuts);
});

function handleCustomShortcuts(e: KeyboardEvent) {
  // Ignore if typing in input
  if (e.target instanceof HTMLInputElement) return;
  
  // Ctrl+Enter: Quick approve
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    quickApprove();
  }
  
  // Ctrl+D: Mark as duplicate
  if (e.ctrlKey && e.key === 'd') {
    e.preventDefault();
    markAsDuplicate();
  }
}
```

---

## Production Deployment

### Environment Variables

```env
# .env.production
VITE_API_BASE_URL=https://api.yourapp.com/v1
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    // Optimize for production
    minify: 'terser',
    sourcemap: false,
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'aletheia': ['aletheia-labeling-studio']
        }
      }
    }
  }
});
```

### Deploy Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

## Troubleshooting

### Issue: "Module not found: aletheia-labeling-studio"

**Solution:**
```bash
npm install aletheia-labeling-studio
# or
npm install file:../Aletheia-Labeling-Studio  # For local dev
```

### Issue: Styles not loading

**Solution:** Ensure you import the CSS:
```typescript
import 'aletheia-labeling-studio/style.css';
```

### Issue: TypeScript errors

**Solution:** Enable `resolveJsonModule` in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### Issue: Keyboard shortcuts not working

**Solution:** Check that `enableKeyboardShortcuts` is true in config:
```typescript
const config: AletheiaConfig = {
  enableKeyboardShortcuts: true
};
```

### Issue: Events not firing

**Solution:** Ensure event handlers are defined:
```vue
<AletheiaLabeler
  @save="handleSave"
  @skip="handleSkip"
  @validate="handleValidate"
/>
```

### Issue: Items not updating

**Solution:** Use `.value` for refs:
```typescript
trainingItems.value = [...newItems];  // ✅ Correct
trainingItems = [...newItems];        // ❌ Wrong
```

---

## Next Steps

- Read [API Reference](./API.md) for complete documentation
- Check [Development Guide](./DEVELOPMENT.md) for contributing
- Join [GitHub Discussions](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions)

---

**Need Help?**

- 🐛 [Report a Bug](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues/new?template=feature_request.md)
- 💬 [Ask a Question](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions/new?category=q-a)

---

**Last Updated:** December 1, 2025  
**Version:** 0.1.0
