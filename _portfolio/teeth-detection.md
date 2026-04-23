---
title: Teeth Detection & Segmentation
image: /assets/images/tcc.jpeg
external_url: https://github.com/pepemesquita/Tooth_Detection_and_Segmentation
tags:
  - Python
  - YOLOv8
  - Visão computacional
excerpt: Detecção e segmentação de dentes com YOLOv8 e dataset em parceria com a UFRGS.
---

## Contexto

Projeto acadêmico de **detecção e segmentação** de dentes decíduos e permanentes em crianças de 4 a 12 anos, com dataset construído em parceria com o curso de Odontologia da **UFRGS**.

## Como foi feito

- **YOLOv8 (Ultralytics)** para treino e inferência, com preparação de anotações e pipeline de dados alinhado ao domínio odontológico.
- **Python** para scripts de pré-processamento, treino, avaliação de métricas e exportação de resultados.
- Ciclo iterativo: **dados → treino → validação → ajuste de hiperparâmetros e augmentations** até estabilizar métricas aceitáveis para o TCC.

## Desafios

Variabilidade de imagens clínicas, desbalanceamento de classes e alinhamento com especialistas para garantir rótulos consistentes.

## Resultado

Base sólida em **visão computacional aplicada à saúde**, com código e experimentação documentados no repositório público.
