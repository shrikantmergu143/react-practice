# Deployment Options

This project supports two deployment paths:

1. Publish the reusable React components as an npm package.
2. Deploy the React demo/user interface as a website.

## Option 1: Publish Component Package

Before publishing, choose a unique package name in `package.json`.

Examples:

```json
"name": "@your-npm-username/react-practice"
```

or:

```json
"name": "your-react-search-components"
```

Build the package:

```bash
npm run build:package
```

The package output is created in `dist/`.

Login to npm:

```bash
npm login
```

Publish:

```bash
npm publish
```

For scoped public packages:

```bash
npm publish --access public
```

Install it in another React app:

```bash
npm install your-package-name
```

Use it:

```tsx
import { Search } from 'your-package-name';
import 'your-package-name/style.css';
```

## Option 2: Deploy Website UI

Build the demo app:

```bash
npm run build:app
```

The website output is created in `build/`.

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Use these settings if asked:

```text
Build Command: npm run build:app
Output Directory: build
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Use this publish directory:

```text
build
```

### Static Hosting

Upload the full `build/` folder to any static host.
