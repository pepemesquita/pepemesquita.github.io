# Pedro Mesquita — portfólio

Site estático com Jekyll, publicado no GitHub Pages. Conteúdo em português do Brasil e inglês, com preferência de idioma salva no navegador.

## Desenvolvimento

Com Ruby e Bundler instalados:

```sh
bundle install
bundle exec jekyll serve
```

O site fica disponível em `http://localhost:4000`. Para gerar a versão de produção:

```sh
bundle exec jekyll build
```

O workflow `.github/workflows/jekyll.yml` executa o build e a publicação em pushes para `main`.

## Conteúdo e tradução

- `index.html`: apresentação, experiência, resultados, tecnologias, formação e certificações.
- `_data/projects.json`: fonte dos 24 cards, sua ordem, filtros, descrições PT-BR/EN e links.
- `_portfolio/<slug>.md`: conteúdo em português das páginas de projeto.
- `_data/project_translations.json`: título, descrição e corpo Markdown em inglês de cada case, indexados pelo mesmo slug.
- `_layouts/portfolio-item.html`: layout compartilhado dos cases.
- `_includes/language-switcher.html` e `assets/js/i18n.js`: seletor e persistência do idioma.

Para traduzir textos curtos, use `data-en` com o HTML em inglês escapado no atributo e o português dentro do elemento. Para metadados, use `data-en-content`. Não aninhe elementos com `data-en`. O conteúdo deve ser escrito e revisado no repositório; não há serviço de tradução externo.

Ao adicionar um projeto, inclua seu card, arquivo Markdown e tradução com o mesmo slug. Use aspas em campos YAML que contenham dois-pontos. As duas versões do corpo do case são renderizadas pelo Jekyll; apenas o idioma escolhido fica visível. Sem JavaScript, o conteúdo em português permanece acessível.

## Fontes da atualização de carreira e projetos

A atuação na Evolua/Ailos, as certificações e os resultados profissionais foram fornecidos por Pedro. Os indicadores de redução de custos e tempo de suporte descrevem a trajetória profissional, sem atribuição automática à Evolua. O exemplo de ~1 hora para 2 minutos refere-se a um processo específico na cooperativa.

Repositórios públicos consultados em 2 de outubro de 2026 (README e dependências):

- [Espaço Church Jobs](https://github.com/pepemesquita/espacochurch-jobs)
- [Farrapos Field](https://github.com/pepemesquita/farrapos-field)
- [UniReserva](https://github.com/pepemesquita/Unireserva)
- [Forma Palavras](https://github.com/pepemesquita/Forma_Palavras)

A consulta cobriu projetos públicos. Cases de trabalhos privados mantêm o contexto já informado no portfólio.
