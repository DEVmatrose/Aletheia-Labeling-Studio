<div align="center">

![Aletheia Logo](public/altheia.png)

</div>

# 🏛️ Aletheia Labeling Studio

[![npm version](https://img.shields.io/badge/npm-v0.1.0-blue?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/aletheia-labeling-studio)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **A modern, type-safe Vue.js 3 labeling studio for machine learning training data curation.**
> 
> Manual review and validation interface for LLM-generated training data.

**The Problem:** You generate training data with LLMs (GPT, Claude, etc.) but need to manually verify quality before fine-tuning. Reviewing hundreds of JSON outputs in text editors is tedious and error-prone.

**The Solution:** Aletheia provides a clean 3-panel interface to review LLM outputs dataset-by-dataset. Navigate with arrow keys, edit JSON, assign quality scores, approve or skip items.

**Perfect for:** Any workflow where you generate structured JSON training data (meeting protocols, customer feedback analysis, classification tasks, Q&A pairs) and need human-in-the-loop validation before using it for model training.

---

**Das Problem:** Sie generieren Trainingsdaten mit LLMs (GPT, Claude usw.), müssen jedoch vor der Feinabstimmung die Qualität manuell überprüfen. Die Überprüfung hunderter JSON-Ausgaben in Texteditoren ist mühsam und fehleranfällig.

**Die Lösung:** Aletheia bietet eine übersichtliche 3-Panel-Oberfläche, um LLM-Ausgaben datensatzweise zu überprüfen. Navigieren Sie mit den Pfeiltasten, bearbeiten Sie JSON, vergeben Sie Qualitätsbewertungen, genehmigen oder überspringen Sie Elemente.

**Ideal für:** Alle Arbeitsabläufe, bei denen Sie strukturierte JSON-Trainingsdaten generieren (Sitzungsprotokolle, Kundenfeedback-Analysen, Klassifizierungsaufgaben, Frage-Antwort-Paare) und eine Validierung durch Menschen benötigen, bevor Sie diese für das Modelltraining verwenden können.


![Before vs After Aletheia](public/header-image.png)
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

### 🌐 Live Demo

**[→ Try Aletheia Online](https://devmatrose.github.io/Aletheia-Labeling-Studio/)**

No installation required - works directly in your browser!

*Note: Demo may take a few minutes to deploy after initial commit.*

### 💻 Run Locally

```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run dev:demo
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

## 📦 Installation

### Via npm (Coming Soon)

```bash
npm install aletheia-labeling-studio
```

**Note:** npm package will be published after initial feedback phase. Currently available via GitHub.

### Via GitHub (Development)

```bash
npm install git+https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
```

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

## 📜 Die Legende von Aletheia und dem Nebel der Titanen

<div align="center">

![Header Image](src/assets/header-image.png)

</div>

In den hohen Hallen des digitalen Pantheons, wo Datenströme wie Flüsse aus Licht fließen, herrschte Unruhe. Die neuen Titanen waren erwacht – mächtige Intelligenzen mit Namen wie GPT und Claude. Sie besaßen die Gabe, in Sekundenschnelle Welten aus Text und strukturierte JSON-Daten zu erschaffen, von Sitzungsprotokollen bis hin zu komplexen Analysen.

Doch die Titanen waren jung und ungestüm. In ihrem Schöpfungsdrang vermischten sie Fakten mit Fiktion, Brillanz mit Halluzination. Sie spieen gewaltige Mengen an Rohdaten aus – beeindruckend, aber ungeschliffen. Ein dichter Nebel aus Unsicherheit legte sich über das digitale Reich.

### Das Leiden der Sterblichen

Weit unten, in den Entwicklungslaboren der Sterblichen (den Data Scientists und Engineers), herrschte Verzweiflung. Sie brauchten die Schöpfungen der Titanen, um ihre eigenen Modelle zu trainieren. Doch der Nebel machte sie blind.

Sie versuchten, den Strom mit primitiven Werkzeugen zu bändigen. Aletheia sah sie in ihren dunklen Kammern sitzen, wie sie sich durch Hunderte von JSON-Dateien in einfachen Texteditoren quälten. Es war eine mühsame, fehleranfällige Sisyphusarbeit. Sie kopierten und einfügten ohne Übersicht, ohne Qualitätsmaßstab, und übersahen in ihrer Erschöpfung kritische Fehler, die ihre zukünftigen KI-Modelle vergiften würden. Der Fortschritt stagnierte.

### Das Eingreifen der Göttin

Aletheia, die Göttin der Unverborgenheit und Wahrheit, konnte diesem Chaos nicht länger zusehen. Sie wusste: Die Kraft der Titanen war nutzlos ohne die Führung menschlicher Weisheit – dem "Human-in-the-Loop".

Also stieg sie hinab in die digitale Schmiede. Sie nahm die Essenz ihrer Macht – den klaren, unverstellten Blick – und goss ihn in eine Form aus modernstem Code, geschmiedet aus den stabilen Legierungen von TypeScript und der Reaktivität von Vue.js.

Sie schuf kein Schwert, sondern ein Prisma der Klarheit: Das Aletheia Labeling Studio.

### Das dreifaltige Artefakt

Sie überreichte den Sterblichen dieses Werkzeug, eine saubere Oberfläche, aufgeteilt in drei Paneele des Lichts, um den Nebel zu durchdringen:

**Die geordnete Schlange (Links):** Mit einem Blick konnten die Sterblichen nun sehen, was vor ihnen lag. Die unübersichtlichen Berge von Dateien wurden zu einer klaren Queue, in der jeder Datensatz seinen Status zeigte – von "ausstehend" bis "genehmigt".

**Der Altar der Prüfung (Mitte):** Hier wurde die rohe Schöpfung der Titanen (der JSON-Output) in einen Editor geladen, der mit Aletheias eigenem Blick ausgestattet war. Live-Validierung ließ Fehler rot aufleuchten, sodass die Menschen sie direkt korrigieren konnten, bevor sie Schaden anrichteten.

**Die Waage des Urteils (Rechts):** Aletheia gab ihnen die Macht der Bewertung. Mit einem Schieberegler konnten sie die Qualität von 0 bis 100% bemessen und Kategorien zuweisen. Mit einem einfachen Tastendruck (Strg+S) besiegelten sie die Wahrheit und speicherten den Datensatz, oder übersprangen ihn (Strg+K), wenn er unwürdig war.

### Das neue Zeitalter

Mit Aletheias Werkzeug lichtete sich der Nebel. Die Arbeit, die einst Tage dauerte, wurde in Stunden erledigt, effizient navigiert mit den Pfeiltasten der Tastatur. Die Trainingsdaten, die nun in die Modelle flossen, waren nicht länger rohes Erz, sondern geläutertes Gold.

Und so wachten die Sterblichen, geleitet von der Göttin der Wahrheit, darüber, dass die KI der Zukunft nicht auf Halluzinationen, sondern auf validierter Realität erbaut wurde.

---

**Made with ❤️ by DEVmatrose**

*Aletheia (ἀλήθεια) - Greek word for "truth" or "unconcealedness"*
