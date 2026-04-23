---
title: Espaço Church Pelotas
image: /assets/images/espaco.jpg
external_url: https://espacochurch.org/
tags:
  - Vite
  - React 18
  - TypeScript
  - Node.js
  - Express
  - Prisma
  - PostgreSQL
  - FastAPI
  - Docker
excerpt: Aplicação full-stack para o site institucional e sistema de gestão interna da Espaço Church Pelotas.
---

Aplicação full-stack para o **site institucional** e **sistema de gestão interna** da Espaço Church Pelotas. Tudo abaixo foi desenvolvido por mim neste projeto.

## Funcionalidades

### Site público

- Páginas institucionais (história, missão, localização, presbitério, ministérios)
- Agenda de eventos e calendário público
- Busca e detalhes de grupos de comunhão
- Páginas de ministérios (Kids, Hope, Jovem)
- Primeira visita, sobre Jesus, apoio pastoral, oração
- Contribuição (PIX) e voluntariado
- Formulário de contato
- SEO otimizado (meta tags, Open Graph, JSON-LD)

### Autenticação e membros

- Registro com verificação de e-mail e aprovação manual
- Auto-cadastro via token de registro gerado pela secretaria
- Login com JWT (1h de expiração) e token versioning para revogação
- Roles hierárquicas: visitante → membro → lider2 → lider3 → presbitero → pastor / secretaria
- Reset de senha por e-mail

### Cursos e gamificação

- Catálogo de cursos com visibilidade por roles
- Lições com vídeos do YouTube, formulários e materiais para download
- Progresso individual por lição
- Conquistas (achievements) concedidas automaticamente

### Eventos e presença

- CRUD de eventos com suporte a recorrência
- Presença de membros (mobile-first com fotos e checkboxes)
- Registro de visitantes
- Estatísticas em tempo real
- Calendário institucional

### Wi-Fi captive portal

- Autenticação por CPF na rede Wi-Fi da igreja
- Marcação automática de presença em eventos ativos
- Fluxo de visitante com registro (apenas durante eventos)
- Integração com UniFi Controller (24h de acesso por dispositivo)

### Reconhecimento facial

- Atualização de foto pública (`/atualizar-foto`) com consentimento LGPD
- Serviço de IA (FastAPI + face_recognition) para embeddings faciais
- Reconhecimento via câmeras (RTSP/HTTP/USB/SFTP)
- Capturas desconhecidas para resolução manual

### Área de liderança

- Gestão de grupos: reuniões, presença, membros, visitantes
- Gestão de ministérios: membros, eventos, escalas, relatórios
- Ministério Kids: turmas e membros
- Comunicação com membros

### Administração

- Dashboard com estatísticas e atalhos
- CRUD completo: cursos, membros, usuários, grupos, ministérios, batismos, eventos
- Import de membros via CSV
- Aprovação/rejeição de usuários
- Tokens de registro para auto-cadastro
- Inbox de mensagens de contato
- Visitantes e capturas desconhecidas
- Relatórios (frequência, progresso, participação)
- Monitoramento de segurança (IPs suspeitos/bloqueados)
- Revogação de sessões (global e por usuário)

## Tech stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Vite 5.4, React 18, TypeScript 5.5, Tailwind CSS, shadcn/ui |
| Backend | Node 20, Express, Prisma 5, PostgreSQL 15 |
| AI service | Python 3.9, FastAPI, face_recognition, OpenCV, MediaPipe |
| Camera monitor | Python, watchdog |
| Infra | Docker Compose, Nginx, GitHub Actions |
| Deploy | VPS (Docker) + Vercel (frontend alternativo) |

## Estrutura do projeto

```text
├── src/                    # Frontend React
│   ├── pages/              # Páginas (public, admin, leader, wifi, facial)
│   ├── components/         # Componentes (ui, app, auth, home, leader)
│   ├── contexts/           # AuthContext
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # WifiLayout, FacialEnrollmentLayout
│   ├── lib/                # API layer, utils, ministry roles
│   └── types/              # TypeScript types
├── backend/
│   ├── src/
│   │   ├── index.ts        # Entry point + rotas principais
│   │   ├── wifi.routes.ts  # Captive portal
│   │   ├── camera.routes.ts # Reconhecimento facial
│   │   ├── public-member.routes.ts # Membro público (foto)
│   │   ├── mail.ts         # E-mails (SMTP/Resend)
│   │   ├── achievements.ts # Gamificação
│   │   ├── eventRecurrence.ts # Recorrência de eventos
│   │   ├── controllers/    # MemberPhotoController
│   │   ├── utils/          # IP detection, action tokens
│   │   └── scripts/        # Manutenção (fix CPFs)
│   └── prisma/
│       └── schema.prisma   # Modelos do banco
├── ai-service/             # Serviço de IA (FastAPI)
│   ├── main.py             # Endpoints de reconhecimento
│   ├── capture.py          # Captura de câmeras
│   └── Dockerfile
├── camera-monitor/         # Monitor de câmeras (SFTP)
│   └── monitor.py
├── nginx/                  # Configurações Nginx
│   ├── nginx.conf          # Single-host (padrão)
│   ├── production.conf     # Split-host (site + api)
│   └── web.conf            # SPA estático (container frontend)
├── deploy/                 # Scripts de deploy
├── .github/workflows/      # CI/CD (deploy via SSH)
├── docker-compose.yml      # Orquestração dos serviços
├── Dockerfile.web          # Frontend (multi-stage → nginx)
└── memory-bank/            # Documentação do projeto
```

## Desenvolvimento local

### Pré-requisitos

- Node.js 20+
- PostgreSQL 15 (ou Docker)
- Python 3.9+ (para o AI service, opcional)

### Frontend

```bash
npm install
npm run dev
# Acesse http://localhost:8080
```

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
# API em http://localhost:4000
```

### Docker (tudo junto)

```bash
cp .env.example .env
# Edite o .env com suas configurações
docker compose up -d --build
# Acesse http://localhost
```

## Variáveis de ambiente

Veja `.env.example` para a lista completa. Principais:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão PostgreSQL |
| `JWT_SECRET` | Secret para tokens JWT |
| `APP_URL` | URL pública da aplicação |
| `CORS_ORIGIN` | Origens permitidas (separadas por vírgula) |
| `MAIL_PROVIDER` | `smtp` ou vazio (usa Resend) |
| `SMTP_*` | Configurações SMTP |
| `RESEND_API_KEY` | API key do Resend |
| `VITE_API_URL` | URL da API para o frontend |
| `UNIFI_*` | Configurações do UniFi Controller |
| `AI_SERVICE_URL` | URL do serviço de IA |
| `CAMERA_VECTOR_TOKEN` | Token de autenticação para câmeras |
| `SECURITY_IP_MODE` | `off`, `monitor` ou `block` |
| `NGINX_CONFIG` | Arquivo de config do Nginx (padrão: `nginx.conf`) |

## Deploy

### Produção (VPS)

O deploy é automatizado via GitHub Actions. A cada push na branch `main`:

1. Conecta via SSH na VPS
2. Faz `git fetch` e `git reset --hard origin/main`
3. Reconstrói e reinicia os containers Docker

### Frontend (Vercel)

Alternativa para o frontend via `vercel-build.sh` (instala yt-dlp + ffmpeg, roda `npm run build`).

## Segurança

- **Helmet.js**: headers HTTP de segurança (CSP, XSS, clickjacking)
- **CORS**: lista restritiva de origens permitidas
- **Rate limiting**: Nginx limita requisições por tipo de rota
- **IP tracking**: detecção e bloqueio automático de IPs suspeitos
- **Token versioning**: revogação de sessões sem invalidar JWT no servidor de forma custosa
- **Action tokens**: HMAC-signed para ações públicas seguras

## Licença

Projeto privado da Espaço Church Pelotas.
