# 🛠️ Development Guide - Aletheia Labeling Studio

Complete guide for contributors and developers working on Aletheia.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Building](#building)
5. [Testing](#testing)
6. [Code Style](#code-style)
7. [Contributing](#contributing)
8. [Publishing](#publishing)
9. [Maintenance](#maintenance)

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **pnpm** 8+
- **Git** 2.40+
- Code editor with Vue/TypeScript support (VS Code recommended)

### Clone Repository

```bash
git clone https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio
```

### Install Dependencies

```bash
npm install
```

**Dependencies installed:**
- Vue 3.5.13
- TypeScript 5.7.2
- Vite 6.0.5
- Tailwind CSS 3.4.17
- Monaco Editor 0.52.2 (dev)
- vite-plugin-dts 4.3.0 (TypeScript declarations)
- vitest 2.1.8 (testing framework)

### Verify Installation

```bash
npm run type-check  # Should pass without errors
npm run dev:demo    # Should start demo at http://localhost:5175
```

---

## Project Structure

```
aletheia-labeling-studio/
├── src/                          # Library source code
│   ├── components/               # Vue components
│   │   ├── AletheiaLabeler.vue  # Main orchestrator
│   │   ├── QueuePanel.vue       # Item queue (left panel)
│   │   ├── EditorPanel.vue      # JSON editor (center)
│   │   ├── ValidationPanel.vue  # Validation controls (right)
│   │   └── index.ts             # Public exports
│   │
│   ├── composables/              # Vue composables
│   │   └── useAletheia.ts       # State management
│   │
│   ├── types/                    # TypeScript definitions
│   │   └── index.ts             # Exported types
│   │
│   ├── styles/                   # Styles
│   │   └── aletheia.css         # Component styles
│   │
│   ├── assets/                   # Static assets
│   │   └── altheia.png          # Logo
│   │
│   └── style.css                 # Tailwind base styles
│
├── demo/                         # Demo application
│   ├── App.vue                  # Demo app component
│   ├── main.ts                  # Demo entry point
│   ├── index.html               # Demo HTML
│   └── mock-data/
│       └── samples.json         # Demo data
│
├── docs/                         # Documentation
│   ├── API.md                   # API reference
│   ├── INTEGRATION.md           # Integration guide
│   ├── DEVELOPMENT.md           # This file
│   ├── WHITEPAPER.md            # Technical whitepaper
│   └── images/                  # Screenshots
│
├── dist/                         # Build output (gitignored)
│   ├── aletheia.es.js          # ES module build
│   ├── aletheia.umd.js         # UMD build
│   ├── aletheia-labeling-studio.css
│   └── index.d.ts              # TypeScript declarations
│
├── package.json                  # npm configuration
├── vite.config.ts               # Library build config
├── vite.config.demo.ts          # Demo build config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── postcss.config.cjs           # PostCSS config
├── README.md                    # Project readme
├── LICENSE                      # MIT license
└── .gitignore                   # Git ignore rules
```

---

## Development Workflow

### 1. Start Demo Development Server

```bash
npm run dev:demo
```

**What it does:**
- Starts Vite dev server at http://localhost:5175
- Hot Module Replacement (HMR) enabled
- Uses `demo/App.vue` as entry point
- Mock data from `demo/mock-data/samples.json`

**Access demo:**
```
http://localhost:5175
```

### 2. Watch Library Build (for integration testing)

```bash
npm run build:lib -- --watch
```

**What it does:**
- Rebuilds library on file changes
- Outputs to `dist/`
- Useful when testing integration in another project

### 3. Type Checking

```bash
npm run type-check
```

**What it does:**
- Runs `vue-tsc` to check TypeScript errors
- No output files generated
- Must pass before committing

### 4. Preview Production Build

```bash
npm run build:demo
npm run preview
```

**Access preview:**
```
http://localhost:4173
```

---

## Building

### Build Library (for npm)

```bash
npm run build:lib
```

**Output:**
```
dist/
├── aletheia.es.js              # ES module (27.42 KB)
├── aletheia.umd.js             # UMD module (22.39 KB)
├── aletheia-labeling-studio.css # Styles (0.23 KB)
└── index.d.ts                  # TypeScript declarations
```

**Configuration:** `vite.config.ts`

**Key features:**
- Tree-shakable ES module
- UMD for legacy support
- External Vue dependency (peer)
- TypeScript declarations via `vite-plugin-dts`

### Build Demo (for GitHub Pages)

```bash
npm run build:demo
```

**Output:**
```
dist/demo/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── altheia.png
```

**Configuration:** `vite.config.demo.ts`

### Build All

```bash
npm run build
```

**Runs:**
1. `npm run build:lib`
2. `npm run build:demo`

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test
```

**Configuration:** `vitest.config.ts` (to be created)

**Test files location:** `src/**/*.spec.ts`

**Example test:**
```typescript
// src/composables/useAletheia.spec.ts
import { describe, it, expect } from 'vitest';
import { useAletheia } from './useAletheia';

describe('useAletheia', () => {
  it('should initialize with empty items', () => {
    const { stats } = useAletheia([]);
    expect(stats.value.total).toBe(0);
  });

  it('should calculate pending items correctly', () => {
    const items = [
      { id: '1', input: 'test', output: {}, status: 'pending' },
      { id: '2', input: 'test', output: {}, status: 'completed' }
    ];
    const { pendingItems } = useAletheia(items);
    expect(pendingItems.value.length).toBe(1);
  });
});
```

### Component Tests

```bash
npm run test -- --ui
```

**Opens Vitest UI for interactive testing**

### Type Tests

```bash
npm run type-check
```

---

## Code Style

### TypeScript

**Strict mode enabled:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Type everything explicitly:**
```typescript
// ✅ Good
function handleSave(item: AletheiaItem): void {
  console.log(item);
}

// ❌ Bad
function handleSave(item) {
  console.log(item);
}
```

### Vue Components

**Use Composition API with `<script setup>`:**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { AletheiaItem } from '../types';

// Props
interface Props {
  items: AletheiaItem[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

// Emits
interface Emits {
  (e: 'save', item: AletheiaItem): void;
  (e: 'skip', item: AletheiaItem): void;
}

const emit = defineEmits<Emits>();

// State
const currentIndex = ref(0);

// Computed
const currentItem = computed(() => props.items[currentIndex.value]);

// Methods
function handleSave() {
  if (currentItem.value) {
    emit('save', currentItem.value);
  }
}
</script>
```

### CSS (Tailwind)

**Use utility classes:**
```vue
<template>
  <div class="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Save
    </button>
  </div>
</template>
```

**Custom classes in `aletheia.css`:**
```css
.aletheia-button-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
  @apply hover:bg-blue-600 transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
```

### Naming Conventions

**Files:**
- Components: `PascalCase.vue` (e.g., `AletheiaLabeler.vue`)
- Composables: `camelCase.ts` (e.g., `useAletheia.ts`)
- Types: `index.ts` in `types/` folder

**Variables:**
- `camelCase` for variables, functions
- `PascalCase` for types, interfaces, components
- `UPPER_SNAKE_CASE` for constants

**Example:**
```typescript
const MAX_ITEMS = 100;                    // Constant
const currentItem = ref<AletheiaItem>();  // Variable
interface AletheiaConfig {}                // Interface
function loadNextItem() {}                 // Function
```

---

## Contributing

### Workflow

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes**
4. **Test thoroughly**
   ```bash
   npm run type-check
   npm run build:lib
   npm run dev:demo  # Test in demo
   ```
5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: Add batch approve functionality"
   git commit -m "fix: Resolve keyboard shortcut conflict"
   git commit -m "docs: Update API reference for new props"
   ```
6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(validation): Add custom validation rules per pillar

- Added ValidationPanel support for custom rules
- Updated AletheiaConfig interface
- Added tests for validation logic

Closes #42
```

```
fix(editor): Resolve JSON syntax validation error

The JSON editor was not detecting trailing commas correctly.
Fixed regex pattern in validation function.
```

### Pull Request Guidelines

**Before submitting:**
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Library builds successfully (`npm run build:lib`)
- [ ] Demo works correctly (`npm run dev:demo`)
- [ ] All tests pass (when tests are added)
- [ ] Documentation updated (if API changed)
- [ ] Commit messages follow convention

**PR Title Format:**
```
feat: Add batch operation support
fix: Resolve keyboard shortcut conflict on macOS
docs: Update integration guide for Supabase
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in demo
- [ ] Type checking passes
- [ ] Library builds without errors

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] No TypeScript errors
```

---

## Publishing

### Preparation

1. **Update version in `package.json`**
   ```json
   {
     "version": "0.2.0"
   }
   ```

2. **Update CHANGELOG.md**
   ```markdown
   ## [0.2.0] - 2025-12-15
   
   ### Added
   - Batch approve functionality
   - Dark mode toggle
   
   ### Fixed
   - Keyboard shortcut conflict on macOS
   ```

3. **Build library**
   ```bash
   npm run build:lib
   ```

4. **Test build locally**
   ```bash
   npm pack
   # Creates aletheia-labeling-studio-0.2.0.tgz
   ```

5. **Test in another project**
   ```bash
   npm install /path/to/aletheia-labeling-studio-0.2.0.tgz
   ```

### Publish to npm

```bash
# Login (first time only)
npm login

# Publish
npm publish --access public

# Verify
npm view aletheia-labeling-studio
```

### GitHub Release

1. **Create tag**
   ```bash
   git tag -a v0.2.0 -m "Release v0.2.0"
   git push origin v0.2.0
   ```

2. **Create GitHub Release**
   - Go to https://github.com/DEVmatrose/Aletheia-Labeling-Studio/releases/new
   - Select tag `v0.2.0`
   - Title: `v0.2.0 - Feature Name`
   - Description: Copy from CHANGELOG.md
   - Attach `aletheia-labeling-studio-0.2.0.tgz`
   - Publish release

---

## Maintenance

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install vue@latest

# Update dev dependencies
npm install -D typescript@latest vite@latest
```

### Security Audit

```bash
# Check vulnerabilities
npm audit

# Auto-fix
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

### Performance Monitoring

**Bundle size:**
```bash
npm run build:lib
ls -lh dist/
```

**Target sizes:**
- ES module: < 30 KB
- UMD module: < 25 KB
- CSS: < 1 KB
- gzipped total: < 10 KB

**If bundle grows too large:**
- Review dependencies
- Use dynamic imports for Monaco Editor
- Tree-shake unused code

---

## Common Tasks

### Add New Component

```bash
# Create component file
touch src/components/NewComponent.vue
```

```vue
<template>
  <div class="new-component">
    <!-- Your template -->
  </div>
</template>

<script setup lang="ts">
// Your logic
</script>

<style scoped>
/* Component-specific styles */
</style>
```

**Export in `src/components/index.ts`:**
```typescript
export { default as NewComponent } from './NewComponent.vue';
```

### Add New Type

```typescript
// src/types/index.ts
export interface NewType {
  id: string;
  name: string;
}
```

### Add New Composable

```typescript
// src/composables/useNewFeature.ts
import { ref, computed } from 'vue';

export function useNewFeature() {
  const state = ref(0);
  
  const doubled = computed(() => state.value * 2);
  
  function increment() {
    state.value++;
  }
  
  return { state, doubled, increment };
}
```

### Update Demo Data

```json
// demo/mock-data/samples.json
[
  {
    "id": "new-001",
    "input": "New example input",
    "output": {
      "result": "example output"
    },
    "status": "pending"
  }
]
```

---

## Troubleshooting Development

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
npm run type-check  # See exact errors
# Fix type issues
npm run build:lib   # Try again
```

### Issue: Demo not updating

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev:demo
```

### Issue: CSS not applying

**Solution:**
```bash
# Rebuild Tailwind
rm -rf dist/
npm run build:lib
```

### Issue: Monaco Editor not loading

**Solution:**
Check import in `EditorPanel.vue`:
```typescript
import * as monaco from 'monaco-editor';
// Monaco is dev dependency, ensure it's installed
```

---

## Resources

- **Vue 3 Docs:** https://vuejs.org/guide/
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Vite Guide:** https://vitejs.dev/guide/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vitest Docs:** https://vitest.dev/guide/

---

## Questions?

- 💬 [GitHub Discussions](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions)
- 🐛 [Report Issues](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues)
- 📧 Email: ogerly@dreammall.earth

---

**Last Updated:** December 1, 2025  
**Maintainer:** DEVmatrose
