# Contributing to Aletheia Labeling Studio

First off, thank you for considering contributing to Aletheia! 🎉

It's people like you that make Aletheia such a great tool for the ML community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [ogerly@dreammall.earth](mailto:ogerly@dreammall.earth).

---

## How Can I Contribute?

### Reporting Bugs

**Before submitting a bug report:**
- Check the [existing issues](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues) to avoid duplicates
- Update to the latest version to see if the bug persists
- Collect debug information (browser console logs, error messages)

**How to submit a good bug report:**

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- **Clear title** - "JSON editor doesn't validate syntax on Safari 14"
- **Steps to reproduce** - Numbered list of exact steps
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, OS, Vue version, Aletheia version
- **Screenshots** - If applicable
- **Code sample** - Minimal reproducible example

### Suggesting Features

**Before submitting a feature request:**
- Check [existing feature requests](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues?q=is%3Aissue+label%3Aenhancement)
- Consider if it fits the project scope (training data labeling)
- Think about how it would benefit other users

**How to submit a good feature request:**

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- **Clear title** - "Add batch approve functionality"
- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you've thought about
- **Use case** - Real-world example of how you'd use it
- **Mockups** - Screenshots, wireframes (if applicable)

### Pull Requests

**Before starting work on a PR:**

1. **Discuss first** - Open an issue to discuss significant changes
2. **Check existing PRs** - Avoid duplicate work
3. **Fork the repo** - Work in your own fork
4. **Create a branch** - Use descriptive names (`feature/batch-approve`, `fix/safari-json-validation`)

**PR Process:**

1. **Make your changes**
   - Follow [coding standards](#coding-standards)
   - Write clear commit messages ([see guidelines](#commit-message-guidelines))
   - Add tests if applicable
   - Update documentation

2. **Test thoroughly**
   ```bash
   npm run type-check  # TypeScript validation
   npm run build:lib   # Library build
   npm run dev:demo    # Test in demo
   ```

3. **Submit PR**
   - Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md)
   - Link related issues (`Closes #42`)
   - Add screenshots for UI changes
   - Request review from maintainers

4. **Address feedback**
   - Respond to review comments
   - Make requested changes
   - Re-request review when ready

**PR Checklist:**

- [ ] Code follows project style guidelines
- [ ] TypeScript compiles without errors
- [ ] Library builds successfully
- [ ] Demo works correctly
- [ ] Documentation updated (if API changed)
- [ ] Commit messages follow convention
- [ ] Tests pass (when tests are added)
- [ ] PR description is clear and complete

---

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Git 2.40+
- VS Code (recommended) with Vue/TypeScript extensions

### Setup Steps

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Aletheia-Labeling-Studio.git
cd Aletheia-Labeling-Studio

# 3. Add upstream remote
git remote add upstream https://github.com/DEVmatrose/Aletheia-Labeling-Studio.git

# 4. Install dependencies
npm install

# 5. Start demo dev server
npm run dev:demo
# → http://localhost:5175

# 6. Type checking (continuous)
npm run type-check

# 7. Build library
npm run build:lib
```

### Project Structure

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for complete project structure documentation.

**Key files:**

- `src/components/` - Vue components
- `src/composables/` - Vue composables (state management)
- `src/types/` - TypeScript definitions
- `demo/` - Standalone demo application
- `docs/` - Documentation (API, Integration, Development)

---

## Coding Standards

### TypeScript

**Always use explicit types:**

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

**Use strict mode (already configured):**
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

### Vue Components

**Use Composition API with `<script setup>`:**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { AletheiaItem } from '../types';

// Props with types
interface Props {
  items: AletheiaItem[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

// Emits with types
interface Emits {
  (e: 'save', item: AletheiaItem): void;
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

<template>
  <div class="container">
    <!-- Your template -->
  </div>
</template>
```

### CSS (Tailwind)

**Prefer utility classes:**

```vue
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Save
</button>
```

**Use custom classes in `aletheia.css` for reusable styles:**

```css
.aletheia-button-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
  @apply hover:bg-blue-600 transition-colors;
}
```

### Naming Conventions

- **Files:** `PascalCase.vue` for components, `camelCase.ts` for composables
- **Variables:** `camelCase`
- **Types/Interfaces:** `PascalCase`
- **Constants:** `UPPER_SNAKE_CASE`

---

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks (deps, build config)
- `perf` - Performance improvements

### Examples

**Simple commit:**
```
feat: Add batch approve functionality
```

**Detailed commit:**
```
feat(validation): Add custom validation rules per pillar

- Added ValidationPanel support for custom rules
- Updated AletheiaConfig interface
- Added documentation in API.md

Closes #42
```

**Breaking change:**
```
feat!: Change AletheiaItem interface

BREAKING CHANGE: Renamed `score` to `qualityScore` in AletheiaItem interface.

Migration guide:
- Update all `item.score` to `item.qualityScore`
```

### Scope (optional)

Common scopes:
- `core` - Core components
- `validation` - Validation logic
- `types` - TypeScript definitions
- `docs` - Documentation
- `demo` - Demo application
- `build` - Build configuration

---

## Community

### Get Help

- 💬 [GitHub Discussions](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions) - Q&A, ideas, show & tell
- 🐛 [GitHub Issues](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/issues) - Bug reports, feature requests
- 📧 Email: [ogerly@dreammall.earth](mailto:ogerly@dreammall.earth)

### Recognition

Contributors will be:
- Listed in `CHANGELOG.md`
- Mentioned in release notes
- Added to README.md contributors section (after 3+ merged PRs)

### First-Time Contributors

Look for issues tagged with:
- `good first issue` - Easy tasks for newcomers
- `help wanted` - Areas where we need help
- `documentation` - Non-coding contributions

---

## Questions?

Don't hesitate to ask! Open a [discussion](https://github.com/DEVmatrose/Aletheia-Labeling-Studio/discussions/new?category=q-a) or reach out via email.

**Thank you for contributing! 🙏**

---

**Last Updated:** December 1, 2025
