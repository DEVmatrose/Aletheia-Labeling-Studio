# 🏛️ Aletheia Labeling Studio

> *A modern, lightweight, and type-safe labeling tool for machine learning training data curation.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)

**Aletheia** is a Vue.js 3 component library for labeling and curating structured training data (JSON outputs) for LLM fine-tuning workflows. Unlike heavyweight annotation platforms focused on images or text, Aletheia specializes in **reviewing and editing AI-generated responses** before they enter your training pipeline.

---

## ✨ Key Features

- 🎨 **Modern UI** - Clean 3-column layout with Tailwind CSS, dark mode support
- 📝 **JSON Editor** - Monaco Editor integration (VS Code-like syntax highlighting)
- ✅ **Validation Rules** - Custom validation per category (quality scores, citations)
- 🔄 **Queue Workflow** - Pending → In-Progress → Completed/Skipped state management
- 📊 **Progress Tracking** - Real-time statistics, progress bars, average quality scores
- ⌨️ **Keyboard Shortcuts** - `Ctrl+S` (save), `→` (next), `←` (previous), `Ctrl+K` (skip)
- 🔌 **Backend-Agnostic** - Works with Supabase, REST, GraphQL, or local files
- 💾 **Event-Driven** - Clean separation between UI and data persistence
- 🎯 **TypeScript-First** - Full type safety with auto-generated `.d.ts` files
- 📦 **Tiny Bundle** - Only **7 KB gzipped** (ES module)

---

## 📦 Installation

```bash
npm install aletheia-labeling-studio
```

---

## 🚀 Quick Start

### Try the Demo

```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run dev
# → Open http://localhost:5175
```

**Demo Features:**
- ✅ 5 Mock training items (meeting protocols, customer feedback, email classification)
- ✅ Click items in queue → Loads in editor
- ✅ Edit JSON output with syntax highlighting
- ✅ Quality score slider + category dropdown
- ✅ Validate, Save (simulated), Skip buttons
- ✅ Keyboard shortcuts work (Ctrl+S, arrows)
- ⚠️ **Note:** Save actions are **simulated** (console log + toast notification) - no real database

### Use in Your Project

```vue
<template>
  <AletheiaLabeler
    :items="trainingItems"
    :config="config"
    :loading="loading"
    @save="handleSave"
    @validate="handleValidate"
    @skip="handleSkip"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import 'aletheia-labeling-studio/style.css';
import type { AletheiaItem, AletheiaConfig } from 'aletheia-labeling-studio';

const loading = ref(false);
const trainingItems = ref<AletheiaItem[]>([
  {
    id: 'item-001',
    input: 'Analyze this feedback: The new feature is amazing!',
    output: {
      sentiment: 'positive',
      category: 'feature-feedback',
      priority: 'low',
    },
    status: 'pending',
    qualityScore: 0.85,
    pillar: 'technical',
  },
]);

const config: AletheiaConfig = {
  pillars: ['technical', 'research', 'business'],
  showQualityScore: true,
  allowEdit: true,
  enableKeyboardShortcuts: true,
  validations: {
    research: {
      requireCitation: true,
      minQualityScore: 0.9,
    },
  },
};

async function handleSave(item: AletheiaItem) {
  loading.value = true;
  try {
    // Save to your backend (Supabase, REST API, etc.)
    await yourApi.saveTrainingData(item);
    console.log('✅ Saved:', item);
  } catch (error) {
    console.error('❌ Save failed:', error);
  } finally {
    loading.value = false;
  }
}

function handleValidate(item: AletheiaItem, isValid: boolean, message?: string) {
  if (!isValid) {
    alert(`⚠️ Validation failed: ${message}`);
  }
}

function handleSkip(item: AletheiaItem) {
  console.log('⏭️ Skipped:', item);
}
</script>
```

---

## 📚 Documentation

- **[Getting Started Guide](SETUP.md)** - Complete integration walkthrough
- **[Technical Whitepaper](docs/WHITEPAPER.md)** - Architecture, design decisions, API reference
- **[Demo](https://devmatrose.github.io/Aletheia-Labeling-Studio/)** *(Coming soon)*

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Approve & Save current item |
| `Ctrl+K` | Skip current item |
| `→` (Right) | Load next item |
| `←` (Left) | Load previous item |
| `Ctrl+Enter` | Validate current item |

---

## 🔌 Backend Integration

### Supabase Example

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadPending() {
  const { data } = await supabase
    .from('training_data')
    .select('*')
    .eq('status', 'pending');
  return data;
}

async function handleSave(item: AletheiaItem) {
  await supabase
    .from('training_data')
    .update({
      output_json: item.output,
      quality_score: item.qualityScore,
      status: 'completed',
    })
    .eq('id', item.id);
}
```

### REST API Example

```typescript
async function loadPending() {
  const response = await fetch('/api/training-data?status=pending');
  return response.json();
}

async function handleSave(item: AletheiaItem) {
  await fetch(`/api/training-data/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
  });
}
```

---

## 🆚 Comparison with Alternatives

| Feature | Aletheia | Label Studio | Prodigy | Doccano |
|---------|----------|--------------|---------|---------|
| **Focus** | JSON Labeling | Multi-modal | NER/Text | NER/Text |
| **Bundle Size** | 7 KB | 500+ KB | N/A | 200+ KB |
| **Setup** | npm install | Docker | Python | Docker |
| **Backend** | Your choice | Built-in | Built-in | Built-in |
| **TypeScript** | ✅ First-class | ❌ | ❌ | ❌ |
| **License** | MIT | Apache 2.0 | Commercial | MIT |

**Use Aletheia when:**
- ✅ Labeling structured JSON outputs (LLM responses)
- ✅ Integrating into existing Vue.js dashboard
- ✅ Custom validation logic per category
- ✅ Lightweight deployment (no Docker)

---

## 💡 How the Demo Works

### Mock Data Navigation
1. **Click any item in Queue Panel** (left) → Loads Input/Output in center
2. **Edit JSON** in Editor Panel → Real-time validation (green border = valid, red = error)
3. **Set Quality Score** (0-100%) and select Category in Validation Panel (right)
4. **Click "Validate Data"** → Checks completeness
5. **Click "Approve & Save"** → Simulates API call:
   - Loading spinner (800ms)
   - 90% success → ✅ Green toast: "Item saved successfully!"
   - 10% failure → ❌ Red toast: "Failed to save. Network timeout."
   - Console log with full item data
   - **⚠️ Important:** Changes are NOT persisted (no real database)

### What's Simulated vs. Real

| Feature | Demo | Production |
|---------|------|------------|
| **Item Loading** | ✅ Real (from mock-data/samples.json) | Load from your backend |
| **JSON Editing** | ✅ Real | Same |
| **Validation** | ✅ Real | Same |
| **Save Action** | ⚠️ Simulated (console + toast) | `@save` event → Your API call |
| **Persistence** | ❌ None (refresh = reset) | ✅ Database |
| **Multi-user** | ❌ | ✅ With backend state |

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run dev:demo
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Vue.js Team** - Reactive framework
- **Evan You** - Vite build tool
- **Adam Wathan** - Tailwind CSS
- **Microsoft** - Monaco Editor & TypeScript

---

## 🔗 Links

- **GitHub:** https://github.com/DEVmatrose/Aletheia-Labeling-Studio
- **npm:** https://www.npmjs.com/package/aletheia-labeling-studio
- **Issues:** https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues

---

**Made with ❤️ by DEVmatrose**

*Aletheia (ἀλήθεια) - Greek word for "truth" or "unconcealedness"*
