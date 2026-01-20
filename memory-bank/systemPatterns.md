# System Patterns

## Content & templating
- Páginas HTML com frontmatter (ex.: `project.html`).
- Includes/Layouts em `_includes/` e `_layouts/`.
- Dados em `_data/` (ex.: `_data/projects.json`) renderizados com Liquid.

## Styling
- CSS principal carregado via `/_includes/head.html` (`assets/css/index.*.css`).
- CSS complementar/overrides em `assets/css/custom.css` (carregado após o CSS principal).

