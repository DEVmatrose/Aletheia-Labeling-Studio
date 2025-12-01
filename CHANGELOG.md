# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Full Monaco Editor integration (VS Code-like JSON editing)
- Dark mode toggle
- Batch operations (approve multiple items)
- Export functionality (CSV/JSONL)
- Undo/Redo system
- Real-time collaboration (WebSockets)
- i18n support (German/English)

---

## [0.1.0] - 2025-12-01

### 🎉 Initial Release

**First public release of Aletheia Labeling Studio!**

### Added

#### Core Features
- ✅ **3-Panel Layout** - Queue list (left), JSON editor (center), validation controls (right)
- ✅ **Queue Management** - Filter by status (pending, completed, skipped)
- ✅ **Live JSON Editing** - Syntax validation with green/red border feedback
- ✅ **Quality Scoring** - 0-100% slider per item
- ✅ **Category/Pillar System** - Customizable classification (technical, research, business, etc.)
- ✅ **Progress Tracking** - Visual progress bar and statistics dashboard
- ✅ **Keyboard Shortcuts** - Ctrl+S (save), Ctrl+K (skip), arrows (navigation)
- ✅ **Status Workflow** - pending → in-progress → completed/skipped

#### Components
- `AletheiaLabeler.vue` - Main orchestrator component (239 lines)
- `QueuePanel.vue` - Item list with filtering and progress (175 lines)
- `EditorPanel.vue` - JSON editor with live validation (140 lines)
- `ValidationPanel.vue` - Quality controls and actions (218 lines)

#### State Management
- `useAletheia()` composable - Complete state management (243 lines)
  - Queue filtering (pending, completed, skipped)
  - Navigation (next, previous, select by ID)
  - Item updates (output, pillar, quality score, metadata)
  - Validation logic
  - Event handling (save, skip, validate)

#### TypeScript Support
- Full type definitions (`AletheiaItem`, `AletheiaConfig`, `AletheiaStats`, `AletheiaValidation`)
- Strict mode enabled
- Auto-generated `.d.ts` declarations

#### Styling
- Tailwind CSS 3.4 integration
- Custom Aletheia theme colors
- Dark mode support (CSS variables)
- Responsive 3-column grid layout

#### Demo Application
- Standalone demo with 5 realistic examples:
  - 2x Meeting Protocols (team standup, product launch)
  - 2x Customer Feedback (positive, negative)
  - 1x Email Classification (sales inquiry)
- Mock save simulation (800ms delay, 90% success rate)
- Toast notifications for user feedback

#### Documentation
- 📘 **API.md** - Complete API reference (945 lines)
  - Props, Events, Slots documentation
  - TypeScript interface definitions
  - CSS classes reference
  - 30+ code examples
- 📘 **INTEGRATION.md** - Integration guide (850 lines)
  - Quick Start tutorial
  - REST API integration example
  - Supabase adapter implementation
  - Firebase adapter implementation
  - Customization guide
  - Troubleshooting section
- 📘 **DEVELOPMENT.md** - Developer guide (750 lines)
  - Project structure overview
  - Development workflow
  - Build instructions
  - Testing guidelines
  - Contributing guidelines
  - Publishing process
- 📘 **WHITEPAPER.md** - Technical architecture documentation

#### Build Configuration
- Vite 6.0 for library and demo builds
- ES Module output (29.56 KB, gzipped: 7.62 KB)
- UMD output (24.14 KB, gzipped: 6.83 KB)
- CSS output (25.33 KB, gzipped: 4.45 KB)
- TypeScript declarations generated via vite-plugin-dts

### Technical Highlights

- **Bundle Size:** < 8 KB (gzipped ES module) - Excellent performance
- **Type Safety:** 100% TypeScript coverage with strict mode
- **Zero Runtime Dependencies:** Only Vue 3 as peer dependency
- **Backend-Agnostic:** Props-based API works with any data source
- **Event-Driven:** Clean separation between UI and data persistence
- **Composable Architecture:** Reusable logic via Vue Composables

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with ES2020 support

### Known Limitations

- Monaco Editor not yet integrated (planned for v1.0.0)
- No multi-user collaboration (planned for v2.0.0)
- No undo/redo functionality (planned for v1.1.0)
- Demo uses simulated save (no real backend)

### Dependencies

#### Production
- `vue` ^3.5.13 (peer dependency)

#### Development
- `@vitejs/plugin-vue` ^5.2.1
- `typescript` ^5.7.2
- `vite` ^6.0.5
- `tailwindcss` ^3.4.17
- `vite-plugin-dts` ^4.3.0
- `vitest` ^2.1.8
- `monaco-editor` ^0.52.2

### Installation

```bash
npm install aletheia-labeling-studio
```

### Quick Start

```vue
<script setup lang="ts">
import { AletheiaLabeler } from 'aletheia-labeling-studio';
import 'aletheia-labeling-studio/style.css';

const items = [...]; // Your training data
const config = {
  pillars: ['technical', 'research', 'business']
};

function handleSave(item) {
  console.log('Approved:', item);
}
</script>

<template>
  <AletheiaLabeler
    :items="items"
    :config="config"
    @save="handleSave"
  />
</template>
```

### Contributors

- **DEVmatrose** - Initial work - [GitHub](https://github.com/DEVmatrose)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## [0.0.1] - 2025-11-29

### 🚧 Pre-Release / Development Phase

- Initial project setup
- Core component architecture
- Basic demo implementation
- Internal testing

---

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Run `npm run build:lib`
4. Test build: `npm pack`
5. Commit changes: `git commit -m "chore: Release vX.Y.Z"`
6. Create tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
7. Push: `git push origin main --tags`
8. Create GitHub Release with changelog
9. Publish to npm: `npm publish --access public`

---

**Questions?** Open an [issue](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues) or start a [discussion](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions)!
