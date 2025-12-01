# Aletheia Labeling Studio

[![npm version](https://img.shields.io/npm/v/aletheia-labeling-studio.svg)](https://www.npmjs.com/package/aletheia-labeling-studio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A beautiful, flexible, and powerful Vue.js 3 component for labeling training data for machine learning models.

## 🎯 Quick Links

- **[🚀 Try Live Demo](./demo/)** - Interactive demonstration with real examples
- **[📖 API Documentation](./API.md)** - Complete API reference
- **[🔧 Integration Guide](./INTEGRATION.md)** - Step-by-step integration tutorials
- **[💻 Development Guide](./DEVELOPMENT.md)** - Contributing and development setup
- **[📄 Whitepaper](./WHITEPAPER.md)** - Architecture and design philosophy

## 🌟 Features

- **Beautiful UI** - Modern, responsive design with Tailwind CSS
- **Flexible** - Works with any backend (REST, GraphQL, Supabase, Firebase)
- **Type-Safe** - Full TypeScript support
- **Queue Management** - Smart item queue with filtering and search
- **Validation Panel** - Review and validate labeled items
- **Keyboard Shortcuts** - Efficient labeling workflow
- **Dark Mode** - Built-in dark mode support

## 📦 Installation

```bash
npm install aletheia-labeling-studio
```

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { AletheiaLabelingStudio } from 'aletheia-labeling-studio'
import 'aletheia-labeling-studio/style.css'

const items = ref([
  { id: 1, content: 'Sample text to label' }
])

const config = {
  fields: [
    { key: 'category', label: 'Category', type: 'select', 
      options: ['positive', 'negative', 'neutral'] }
  ]
}

function handleSave(item) {
  console.log('Saved:', item)
}
</script>

<template>
  <AletheiaLabelingStudio 
    :items="items"
    :config="config"
    @save="handleSave"
  />
</template>
```

## 📚 Documentation

### Core Documentation
- [API Reference](./API.md) - Props, events, types, and examples
- [Integration Guide](./INTEGRATION.md) - Backend integration patterns
- [Development Guide](./DEVELOPMENT.md) - Contributing guidelines

### Learn More
- [Whitepaper](./WHITEPAPER.md) - Architecture and design decisions
- [GitHub Repository](https://github.com/DEVmatrose/Aletheia-Labeling-Studio)
- [npm Package](https://www.npmjs.com/package/aletheia-labeling-studio)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

---

**Built with ❤️ by [DEVmatrose](https://github.com/DEVmatrose)**
