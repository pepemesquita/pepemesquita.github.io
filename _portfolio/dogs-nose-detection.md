---
title: Dogs Nose Detection
image: /assets/images/dogs.png
external_url: https://github.com/pepemesquita/Dogs_Nose_Detection
tags:
  - Python
  - YOLOv8
  - AI
excerpt: Modelo YOLOv8 para detectar narizes de cães em imagens.
---

## Contexto

Projeto de pesquisa aplicada: **detecção de narizes de cães** com **YOLOv8**, pensando em uso futuro em estudos científicos.

## Como foi feito

- Montagem de **dataset** e rotulagem focada na região do focinho.
- **Treino** com Ultralytics YOLOv8 e avaliação de métricas (mAP, recall).
- **Python** para pipeline completo de treino e inferência em lote.

## Desafios

Imagens com **occlusão**, iluminação variada e fundos ruidosos.

## Resultado

Pipeline reprodutível e base para evoluir para **tracking** ou comportamento animal.
