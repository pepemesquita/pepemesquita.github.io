---
title: Enderson Imports
image: /assets/images/enderson-imports.png
external_url: https://www.instagram.com/enderson.imports/
tags:
  - n8n
  - Python
  - Supabase
  - Chatwoot
  - Meta API
  - Slack
excerpt: Agentes para leads de iPhones e planos mensais; dashboard financeiro PF/PJ com agente gestor.
---

## Contexto

Projeto para a **Enderson Imports**: dois frentes principais — **captação e qualificação de leads** (iPhones e planos mensais) e um **dashboard financeiro** pessoal para consolidar movimentações PF e PJ das empresas do cliente.

## Agentes de vendas (leads)

Foram criados **dois agentes** com papéis distintos: um focado na **venda de iPhones** e outro na **venda de planos mensais**, ambos responsáveis por **direcionar e qualificar** conversas até o time humano.

**Stack e integrações:**

- **n8n** — orquestração dos fluxos, webhooks e ramificações conforme a intenção do lead.
- **Python** — regras, normalização de dados e pontos onde script é mais legível que dezenas de nodes.
- **Supabase** — persistência de leads, histórico e estados das conversas com consultas rápidas.
- **API da Meta** — canal oficial de mensagens alinhado às políticas da plataforma.
- **Chatwoot** — **caixa única** para o time responder leads, com filas, etiquetas e visibilidade do funil.
- **Slack** — alertas para o time comercial em tempo real.
- **Notificações em tempo real** — gatilhos para não perder oportunidades fora do horário de pico.

O desenho prioriza **rastreabilidade** (quem entrou, por onde, qual agente atuou) e **handoff** limpo para humano.

## Dashboard financeiro + “secretária”

Projeto adicional: **painel** com visão das finanças **PF e PJ** das empresas que o Enderson possui.

Foi construído um **agente conversacional** que faz o papel de **secretária e gestor financeiro**: o usuário informa na conversa **o que gastou** e **o que recebeu**; o agente **classifica**, **registra** entradas e saídas e **mantém** o painel atualizado — reduzindo planilhas paralelas e esquecimento de lançamentos.

## Desafios

Unificar **dois produtos** (comercial + finanças) sem misturar permissões de dados; manter **LGPD** e minimização de dados sensíveis em mensagens; garantir **consistência** entre o que o agente entendeu e o que foi gravado (confirmações e logs).

## Resultado

Operação comercial mais **previsível** no WhatsApp/Instagram e visão **financeira centralizada** para tomada de decisão rápida.
