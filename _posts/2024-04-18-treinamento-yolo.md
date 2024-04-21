---
layout: post
title:  "Treinamento simples com a YOLOv8"
date:   2024-04-18
author: Pedro Henrique
categories: ia
image: "https://miro.medium.com/v2/resize:fit:1400/1*aBGxLEsUQyyUL7-gUIZU4Q.png"
tags:
- IA
- Visão Computacional
---

Sempre vê o pessoal da IA falando sobre treinamento isso, dataset aquilo e fica perdido sem saber do que se trata? Relaxa, era basicamente assim que eu me sentia antes de entrar na área de visão computacional e aprendizado de máquina, mas tive que aprender na famosa metodologia DOSJ (Dê O Seu Jeito). Nessas idas e vindas me aventurando pelos stackoverflows da vida e alguns cursinhos introdutórios do youtube que eu encontrei o YOLO (You Only Look Once), que é um dos modelos mais populares para detecção de objetos!

  

![YOLO](https://i.ytimg.com/vi/VSdsMiXWHS0/maxresdefault.jpg)

### Pré requisitos

  

* Em primeiro lugar, instale o yolo v8 em seu ambiente python, pode ser o Google Colab ou Jupyter Notebook, adicione uma célula nova e digite:

  

```
pip install ultralytics
```

### Preparação de dados:

a) Acesse [roboflow.com](http://roboflow.com/)  ou o [darwin.com](https://darwin.v7labs.com/), crie uma conta e um espaço de trabalho;

b) Clique em Criar um novo projeto ou New Dataset (no Darwin);

![Tela do Roboflow](https://miro.medium.com/v2/resize:fit:720/format:webp/1*rQtEeLjQUfUSSH7tn-cNdQ.png)

c) Escolha o projeto conforme necessário. 
- Detecção se você precisar de uma detecção de caixa delimitadora na imagem;
- Classificação se quiser classificar a imagem - rótulo único por imagem; 
- Segmentação se quiser uma máscara pintadinha ao redor do objeto detectado;

d) Carregar todas as imagens – escolha a pasta ou arquivo para carregar. Isso deve carregar todas as imagens. Se você tiver uma imagem pré-rotulada, poderá fazer upload das imagens com rótulos e o roboflow fará a correspondência. Isso é útil se você já tiver um conjunto de dados rotulado em algum outro formato ou quiser adicionar mais imagens ao conjunto de dados;

e) Escolha a divisão do conjunto de dados - geralmente 70–20–10 é a melhor opção ou a mais usada - eu sou do contra, uso 70-15-15 às vezes hehe;

f) Agora, a parte principal. Atribua imagens e anote, cara isso demora. Então pode convidar outras pessoas para participar da anotação ou começar a anotar todas as imagens. Ouça músicas, podcast, reflita sobre sua vida, converse com alguém ou faça qualquer coisa enquanto anota. Certifique-se de anotar corretamente ou isso confundiria o modelo mais tarde. Certifique-se de que os nomes das classes sejam consistentes em todas as imagens. Geralmente ele preenche os nomes das classes que você forneceu sozinho, então não há necessidade de digitar sempre;

g) Gere o conjunto de dados - depois disso, você pode adicionar uma etapa de pré-processamento e uma etapa de aumento, se necessário, aos seus dados. Você pode usar essas etapas conforme necessário, pois elas dependem totalmente do caso de uso. Você pode baixar os dados como zip ou usar o código de download e executá-lo em python. Você pode escolher em qual formato deseja baixar as anotações. Existe uma opção que diz Yolov8 COCO, escolha essa. Existem diferentes métodos de anotação – COCO é um dos mais usados;

![Snippet](https://miro.medium.com/v2/resize:fit:640/format:webp/1*khmEEcWTEeL0rJLf0fQBnw.png)

h) Baixe os dados: execute o script. Ele baixa os dados em seu diretório de trabalho. Dentro da pasta estarão as pastas **_train, test, valid_** e o arquivo de configuração **_data.yaml ._**;

### Prepare o conjunto de dados para treinamento no formato yolov8

Certifique-se de que o **settings.yaml** arquivo do yolo esteja **datasets_dir** configurado corretamente. **datasets_dir** é onde o yolo procuraria o conjunto de dados e o arquivo de configuração. Você pode editar o _settings.yaml_ para yolo usando o comando abaixo e a imagem abaixo mostra sua aparência. Certifique-se de _que datsets_dir_ esteja apontando corretamente para o local onde seu conjunto de dados está.

````

gedit.config/Ultralytics/settings.yaml

````

![Settings](https://miro.medium.com/v2/resize:fit:720/format:webp/1*X56upbd91SlWpAy_gsJOIg.png)

Certifique-se de que seu **data.yaml** arquivo esteja correto. Certifique-se de que o caminho do conjunto de dados, dos rótulos de treinamento e de teste esteja configurado corretamente. Esta é a aparência que deve ter ou, dependendo de como você configurou, certifique-se de que esteja configurado corretamente.

```
names:  
- trunks  
nc: 1  
test: test/images  
train: train/images  
val: valid/images
```
### Treinamento de modelo

Você pode usar qualquer modelo fornecido pelo YOLO (yolov8n, yolov8x ou qualquer modelo yolo pré-treinado que você tenha - é necessário fornecer o caminho para o arquivo .pt do modelo) lista completa de modelos disponíveis e outros detalhes nesse [link](https://github.com/ultralytics/ultralytics) . A fotinha abaixo mostra diferentes modelos disponíveis para detecção. Você pode clicar no menu suspenso de outras tarefas para ver os modelos disponíveis.

![Github Yolo](https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZLpgf19717xoFKmvmGFJtQ.png)

Para treinar o modelo, existem diferentes hiperparâmetros que podem ser ajustados, são específicos da aplicação. Para lista completa de hiperparâmetros e mais informações, acesse o site abaixo:

docs.ultralytics.com

Abaixo está o código para realmente treinar o modelo. Este é um exemplo simples e você pode alterar e experimentar os hiperparâmetros para ver o que eles fazem e como afetam o desempenho do seu modelo.

```
from ultralytics import YOLO  
model  = YOLO("yolov8n.pt")  
data_yaml_path ='Tree-Trunks-2/data.yaml'  
model.train(data = data_yaml_path,  
epochs=500,  
imgsz=640,  
device=0,  
)
```

Isso salva o modelo dentro da pasta **runs**. Geralmente cria uma nova pasta sempre que você a configura. Para retomar do modelo treinado anterior, você pode definir **resume = True**

### Executando a Inferência

Após o treinamento do modelo, ele deverá, por padrão, salvá-lo em **/detect/train** + qualquer número, dependendo de quantas vezes você tentou isso. ou pode estar dentro de **/segment/train** dependendo se você usou modelos de detecção ou segmentação. Pode haver outra pasta para outras tarefas também. Dentro desta pasta é onde estará o seu modelo mantido junto com todas as inferências de validação e as métricas de desempenho do modelo. Isso é o que você reportará quando disser que seu modelo teve um desempenho bom ou ruim.

Para executar a inferência do modelo na imagem, você pode usar o seguinte código:
```
import os  
import cv2  
import random  
  
model = YOLO('runs/detect/train/weights/best.pt')  
  
path = '/home/user/Dataset/'  
imgp = path+'/images/'  
num_images = 10  
images = random.sample(os.listdir(imgp), num_images)  
#Mostra os resultados 
for image in images:  
imgpath = imgp+image  
results = model(imgpath, conf = 0.5, iou = 0.6)  
r = results[0]  
im_array = r.plot() # plota um array de predições  
# cv2.imwrite('predicted.png',im_array)  
cv2.namedWindow("asd", cv2.WINDOW_NORMAL)  
cv2.imshow('asd',im_array)  
cv2.waitKey(0)  
cv2.destroyAllWindows()
```

Este bloco de código pega o modelo treinado - _best.pt_ , que salva o melhor modelo durante o treinamento. Estou fornecendo um _path_ para onde as  imagens estão e executando a inferência em 10 imagens escolhidas aleatoriamente para ter uma ideia do desempenho do modelo.

Então é basicamente isso! Você pode simplesmente fornecer esse arquivo _.pt_ a qualquer pessoa e ela poderá executar o modelo em sua máquina com seu melhor modelo treinado!

Qualquer dúvida ou sugestão, me contate na aba "Sobre" ou pelo e-mail abaixo!




