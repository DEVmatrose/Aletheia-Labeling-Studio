<div align="center">

![Aletheia - Goddess of Data Truth](docs/images/aletheia-logo.png)

# Aletheia Labeling Studio

> Review and validate LLM-generated training data before fine-tuning.

</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)

You generate training data with LLMs but manually reviewing hundreds of JSON outputs in text editors is tedious and error-prone. Aletheia gives you a clean 3-panel interface to review outputs dataset-by-dataset. Navigate with arrow keys, edit JSON live, assign quality scores, and approve or skip items.

Built for workflows where you generate structured training data (meeting protocols, feedback classification, Q&A pairs) and need human validation before model training.

---

## Features

- **3-panel interface** - Queue, editor, validation side-by-side
- **Live JSON validation** - Instant syntax feedback
- **Quality scoring** - 0-100% slider per item
- **Keyboard workflow** - `→` next, `←` previous, `Ctrl+S` save
- **Status tracking** - pending → completed / skipped
- **Backend agnostic** - Props/events API, works with any storage
- **Lightweight** - 7 KB gzipped Vue 3 component

---

## Demo

```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
npm install
npm run dev  # → http://localhost:5175
```

The demo shows the full workflow with 5 mock samples. Save actions are simulated (no database) to demonstrate UX. Click items in the queue, edit JSON, assign quality scores, and use keyboard shortcuts.

---

## Installation

```bash
npm install aletheia-labeling-studio  # Not yet published - in development
```

```vue
<template>
  <AletheiaLabeler :items="items" :config="config" @save="handleSave" />
</template>

<script setup lang="ts">
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import 'aletheia-labeling-studio/style.css';

const items = ref([{
  id: '1',
  input: 'Analyze: The feature is great!',
  output: { sentiment: 'positive', category: 'feedback' },
  status: 'pending',
  qualityScore: 0.85,
}]);

const config = { pillars: ['technical', 'research'], allowEdit: true };

async function handleSave(item) {
  await yourBackend.save(item);
}
</script>
```

See [SETUP.md](SETUP.md) for backend integration examples (Supabase, REST API).

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+S` | Save |
| `Ctrl+K` | Skip |
| `→` / `←` | Navigate |
| `Ctrl+Enter` | Validate |

---

## License

MIT © DEVmatrose

*Aletheia (ἀλήθεια) - Greek for "truth"*
