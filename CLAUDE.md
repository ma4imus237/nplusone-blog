# n+1 Blog

Minimalistischer, text-fokussierter Blog im akademisch-editorialen Stil.
Design-Referenz: [Thinking Machines Blog](https://thinkingmachines.ai/blog/)

## Tech-Stack

- **Static Site Generator**: Hugo
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Content**: Markdown-Dateien in `content/posts/`
- **Fonts**: Inter (UI/Sans), Georgia/Iowan Old Style (Content/Serif), Space Grotesk (Logo)
- **Hosting**: Static files (Vercel, Netlify, Cloudflare Pages, etc.)
- **Sprache**: UI auf Englisch. Content je nach Post Deutsch oder Englisch (steuerbar via `lang` in Frontmatter).

## Verzeichnisstruktur

```
.
├── archetypes/default.md       # Template fuer neue Posts
├── assets/css/main.css         # Tailwind-Einstiegspunkt
├── content/
│   ├── _index.md               # Blog-Index Metadata (Titel)
│   └── posts/*.md              # Blog-Posts
├── layouts/
│   ├── _default/
│   │   ├── baseof.html         # HTML-Shell
│   │   ├── list.html           # Blog-Index
│   │   └── single.html         # Einzelner Post
│   ├── partials/
│   │   ├── head.html           # <head> Meta, Fonts, CSS
│   │   ├── header.html         # Logo + Navigation
│   │   └── footer.html         # Footer
│   └── index.html              # Homepage
├── static/                     # Statische Assets
├── hugo.toml                   # Hugo-Konfiguration
├── package.json                # Tailwind Dependencies
├── tailwind.config.js          # Design-Tokens
├── postcss.config.js           # PostCSS-Pipeline
├── CLAUDE.md                   # Diese Datei
└── design.md                   # Design-Spezifikation
```

## Entwicklung

```bash
# Dev-Server starten (inkl. Drafts)
hugo server -D

# Neuen Post erstellen
hugo new posts/mein-neuer-post.md

# Produktions-Build
hugo --minify
```

Tailwind wird ueber Hugos Asset-Pipeline via PostCSS verarbeitet. Kein separater Build noetig.

## Konventionen

- **Tailwind-first**: Styling ueber Utility-Klassen, keine separaten CSS-Dateien
- **Semantisches HTML**: header, nav, main, article, footer, time
- **Kein JavaScript**: Ausnahme: Hamburger-Menu Toggle auf Mobile
- **Content ist Markdown**: Kein HTML in Content-Dateien
- **Keine Bilder in der Blog-Liste**: Rein text-basiert
- **Performance**: Nur Google Fonts als externe Ressource

## Frontmatter-Schema

```yaml
---
title: "Post Title"
date: 2026-02-22
author: "Massimo"
description: "Short description for meta tags and RSS"
lang: "en"          # optional, default "en". Set "de" for German posts.
draft: false
---
```

## Design-Referenz

Siehe [design.md](design.md) fuer die vollstaendige Design-Spezifikation.
