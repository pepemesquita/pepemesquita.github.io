---
title: Face Recognition
image: https://miro.medium.com/v2/resize:fit:690/1*2VEXmDdBxs8yo7Le5KRTpw.png
external_url: https://github.com/pepemesquita/Face_Recognition
tags:
  - Python
  - OpenCV
  - Dlib
excerpt: Reconhecimento facial em tempo real para o grupo de robótica da universidade.
---

## Contexto

Implementação em **Python** para o **grupo de robótica** da universidade: captura por câmera e **reconhecimento facial** em tempo quase real.

## Como foi feito

- **OpenCV** para captura e pré-processamento de frames.
- **Dlib**, **Haar Cascade** e **Media Pipe** conforme experimentos e requisitos de performance.
- Pipeline modular para trocar detector sem reescrever toda a aplicação.

## Desafios

Iluminação variável em arena de competição e **latência** aceitável para controle de robô.

## Resultado

Demonstração funcional integrada ao ecossistema de **SSL / robótica**.
