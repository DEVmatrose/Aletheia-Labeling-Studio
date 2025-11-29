<div align="center">

![Aletheia Logo](docs/images/aletheia-logo.png)

</div>

# 🏛️ Aletheia Labeling Studio

> *Manual review and validation interface for LLM-generated training data.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)

**The Problem:** You generate training data with LLMs (GPT, Claude, etc.) but need to manually verify quality before fine-tuning. Reviewing hundreds of JSON outputs in text editors is tedious and error-prone.

**The Solution:** Aletheia provides a clean 3-panel interface to review LLM outputs dataset-by-dataset. Navigate with arrow keys, edit JSON, assign quality scores, approve or skip items.

**Perfect for:** Any workflow where you generate structured JSON training data (meeting protocols, customer feedback analysis, classification tasks, Q&A pairs) and need human-in-the-loop validation before using it for model training.

---

**Das Problem:** Sie generieren Trainingsdaten mit LLMs (GPT, Claude usw.), müssen jedoch vor der Feinabstimmung die Qualität manuell überprüfen. Die Überprüfung hunderter JSON-Ausgaben in Texteditoren ist mühsam und fehleranfällig.

**Die Lösung:** Aletheia bietet eine übersichtliche 3-Panel-Oberfläche, um LLM-Ausgaben datensatzweise zu überprüfen. Navigieren Sie mit den Pfeiltasten, bearbeiten Sie JSON, vergeben Sie Qualitätsbewertungen, genehmigen oder überspringen Sie Elemente.

**Ideal für:** Alle Arbeitsabläufe, bei denen Sie strukturierte JSON-Trainingsdaten generieren (Sitzungsprotokolle, Kundenfeedback-Analysen, Klassifizierungsaufgaben, Frage-Antwort-Paare) und eine Validierung durch Menschen benötigen, bevor Sie diese für das Modelltraining verwenden können.


---

## ✨ Why Aletheia?

**Traditional Approach:**
- ❌ Open 175 JSONL files in VS Code
- ❌ Manually check each LLM output
- ❌ Copy-paste to separate "approved" folder
- ❌ No progress tracking
- ❌ No quality scoring
- ❌ Easy to miss errors

**With Aletheia:**
- ✅ Load all items in one interface
- ✅ Review dataset-by-dataset with arrow keys
- ✅ Edit JSON directly with live validation
- ✅ Assign quality scores (0-100%)
- ✅ Visual progress tracking (142 pending, 28 approved, 5 skipped)
- ✅ Keyboard shortcuts for fast workflow
- ✅ Backend-agnostic (JSON file, database, API - your choice)

## 🎯 Core Features

- 🎨 **3-Panel Layout** - Queue list, JSON editor, validation controls
- 📝 **Live JSON Editing** - Syntax highlighting, validation, format button
- ✅ **Quality Scoring** - 0-100% slider per item
- 🏷️ **Categorization** - Custom categories/pillars (technical, research, business, etc.)
- 🔄 **Status Tracking** - pending → completed / skipped
- ⌨️ **Keyboard Navigation** - `→` next, `←` previous, `Ctrl+S` save, `Ctrl+K` skip
- 📊 **Progress Dashboard** - Visual stats, completion percentage
- 🔌 **Flexible Backend** - Props/Events API, connect to any data source
- 📦 **Lightweight** - 7 KB gzipped, Vue 3 component

---

## 🚀 Try the Demo

**Run locally:**
```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run dev
# → http://localhost:5175
```

**What works in the demo:**
1. **Click any item** in the queue (left panel) → Loads in editor
2. **Edit JSON** in the center panel → Live validation (green/red border)
3. **Set quality score** with slider (0-100%)
4. **Choose category** from dropdown
5. **Click "Validate Data"** → Checks if all required fields are set
6. **Click "Approve & Save"** → Simulates API call (800ms delay)
   - ✅ 90% success → Green toast notification
   - ❌ 10% failure → Red error message
   - Console logs full item data
7. **Keyboard shortcuts** work: `Ctrl+S`, `→`, `←`, `Ctrl+K`

**⚠️ Demo Limitation:** Save actions are **simulated only** - no database backend. Refresh = all changes lost.

---

## 📦 Installation (for your project)

```bash
npm install aletheia-labeling-studio
```

**Note:** Package not yet published to npm. Currently in demo/development phase.

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

- **[Setup Guide](SETUP.md)** - Integration examples (Supabase, REST API, local files)
- **[Technical Whitepaper](docs/WHITEPAPER.md)** - Complete architecture & API reference

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

## 💡 How It Works (Demo)

### The Workflow You'll See

**Scenario:** You generated 5 training datasets with an LLM (meeting summaries, feedback classifications). Now you need to verify quality before using them for fine-tuning.

**Step-by-step:**

1. **Queue Panel (left):**
   - Shows all 5 items with status badges
   - Click any item → Loads in center panel
   - See quality scores at a glance (color-coded)

2. **Editor Panel (center):**
   - **Input**: Original prompt/context (read-only)
   - **Output**: LLM-generated JSON (editable)
   - Edit mistakes directly, live validation shows errors

3. **Validation Panel (right):**
   - Set quality score: 0-100% slider
   - Choose category: meeting-protocol, customer-feedback, email-classification
   - Click "Validate Data" → Checks completeness
   - Click "Approve & Save" → **Simulated** API call (800ms):
     ```javascript
     // 90% success, 10% failure (network timeout simulation)
     setTimeout(() => {
       toast.show('✅ Item saved to database!');
       console.log('💾 Approved:', item);
     }, 800);
     ```

4. **Navigation:**
   - Arrow keys: `←` previous, `→` next
   - Keyboard shortcuts: `Ctrl+S` save, `Ctrl+K` skip
   - Progress bar updates automatically

**⚠️ Demo Limitation:** Save actions are **simulated only** - no real database. Refresh = data resets. This is intentional to show the workflow without backend setup.

### Demo vs. Your Production Setup

| Feature | Demo | Your Implementation |
|---------|------|---------------------|
| **Data Source** | `samples.json` (5 items) | Load from Supabase, REST API, local JSONL files - your choice |
| **Items** | 5 mock examples | Your 175+ LLM-generated training datasets |
| **Navigation** | ✅ Fully functional | ✅ Same |
| **JSON Editing** | ✅ Fully functional | ✅ Same |
| **Validation** | ✅ Fully functional | ✅ Same |
| **Save Action** | ⚠️ Simulated (toast + console) | ✅ Your backend (emit `@save` event) |
| **Persistence** | ❌ None (demo only) | ✅ Your database/file system |
| **Multi-user** | ❌ | ✅ If you add auth layer |

**Integration is simple:** Pass your data as props, handle the `@save` event to persist approved items.

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
