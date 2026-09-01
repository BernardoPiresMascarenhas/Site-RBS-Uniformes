# Fotos dos modelos de uniforme

As imagens desta pasta alimentam o visualizador das páginas de serviço
(`/servicos/portaria`, `/servicos/zeladoria`, `/servicos/asg`) — uma por modelo
oferecido, 21 no total.

O site funciona com a pasta vazia: enquanto o arquivo não existir, aquele modelo
continua exibindo o mockup vetorial. Basta soltar o arquivo aqui **com o nome
exato da lista abaixo** e refazer o build (`npm run build`) — nenhuma alteração
de código é necessária. Dá para entregar as imagens uma a uma.

## Nomes dos arquivos

| Linha | Modelo | Arquivo |
| --- | --- | --- |
| Portaria | Camisa social masculina | `portaria-camisa-social-masculina.webp` |
| Portaria | Camisa social feminina | `portaria-camisa-social-feminina.webp` |
| Portaria | Calça social masculina | `portaria-calca-social-masculina.webp` |
| Portaria | Calça social feminina | `portaria-calca-social-feminina.webp` |
| Portaria | Jaqueta | `portaria-jaqueta.webp` |
| Portaria | Calçado social | `portaria-calcado-social.webp` |
| Portaria | Meia social | `portaria-meia-social.webp` |
| Portaria | Gravata | `portaria-gravata.webp` |
| Portaria | Cinto | `portaria-cinto.webp` |
| Zeladoria | Jaleco com 3 bolsos | `zeladoria-jaleco-3-bolsos.webp` |
| Zeladoria | Camisa em malha | `zeladoria-camisa-malha.webp` |
| Zeladoria | Calça com elástico | `zeladoria-calca-elastico.webp` |
| Zeladoria | Jaqueta | `zeladoria-jaqueta.webp` |
| Zeladoria | Bota em couro | `zeladoria-bota-couro.webp` |
| Zeladoria | Boné | `zeladoria-bone.webp` |
| ASG | Camisa em malha | `asg-camisa-malha.webp` |
| ASG | Jaleco com 3 bolsos | `asg-jaleco-3-bolsos.webp` |
| ASG | Jaqueta | `asg-jaqueta.webp` |
| ASG | Calça com elástico | `asg-calca-elastico.webp` |
| ASG | Calçado antiderrapante | `asg-calcado-antiderrapante.webp` |
| ASG | Bota impermeável | `asg-bota-impermeavel.webp` |

Os caminhos ficam declarados em `lib/services.ts`, no campo `photo` de cada
modelo. Para trocar um nome, altere lá.

## Especificação da imagem

- **Proporção 4:3**, em **1600 × 1200 px** (mínimo aceitável: 1200 × 900).
- **Qualidade máxima na origem** — veja a seção abaixo, é o ponto que mais erra.
- **Área de segurança:** no celular o card vira 5:4 e corta ~3% de cada lado.
  Nada essencial nos 8% das bordas laterais.
- **Sem bordas e sem cantos arredondados** — o card já aplica borda verde e raio
  de 4 px por CSS.
- A peça ocupa ~75% da altura, centralizada, com o fundo verde/preto embutido na
  própria imagem.

### Formato e peso: guarde o arquivo mais pesado que tiver

O `next/image` reencoda cada foto e entrega ao visitante uma versão WebP no
tamanho exato da tela dele. O arquivo desta pasta nunca é baixado direto — ou
seja, **o peso dele não afeta a velocidade do site**. Guarde aqui a melhor
versão disponível:

- **PNG é o ideal** (sem perda). Um PNG de 3 MB aqui é ótimo, não é problema.
- JPEG serve, desde que exportado em qualidade alta (90+). Para 1600 × 1200,
  isso costuma dar **250–600 KB**. Um JPEG de 40 KB nesse tamanho está
  destruído — o fundo escuro fica manchado e nenhuma configuração do site
  recupera.
- A extensão do arquivo pode ser `.png`, `.jpeg`, `.jpg`, `.webp` ou `.avif`; o
  site encontra pelo nome, não pela extensão.

Ao baixar do gerador de imagens, pegue sempre a opção de **resolução original /
HD**, nunca a prévia — a prévia é justamente esse arquivo leve e manchado.

## Prompt para o gerador de imagens

Troque só a primeira frase pela peça desejada (todos os modelos estão na tabela
acima). Para os acessórios — calçado, bota, meia, gravata, cinto e boné — troque
também "em cabide invisível (ghost mannequin), vista frontal" por "sobre
superfície invisível, vista de três quartos" (calçado, bota e boné) ou "vista
frontal, peça solta" (meia, gravata e cinto); o resto do prompt continua igual.

```
Foto de produto profissional de uma camisa social masculina manga
longa azul marinho, em cabide invisível (ghost mannequin), vista
frontal, centralizada.

FUNDO: gradiente diagonal do canto superior esquerdo para o inferior
direito, saindo de verde-esmeralda muito escuro (#013C1E) e virando
preto profundo (#050505) já no meio da imagem — o restante todo preto.
No centro da imagem, um brilho dourado (#C9A227) extremamente sutil,
quase imperceptível, difuso, dissolvendo-se no preto. Textura de grão
fotográfico bem leve sobre tudo. Fundo liso, sem objetos, sem cenário,
sem reflexos no chão.

ENQUADRAMENTO: proporção 4:3 (paisagem). A peça ocupa cerca de 75% da
altura, centralizada, com bastante espaço vazio nas laterais. Nada
importante perto das bordas.

ILUMINAÇÃO: luz suave vinda de cima à esquerda, sombra projetada
discreta abaixo da peça. Sem logos, sem marcas, sem texto, sem
etiquetas visíveis. Sem pessoas.

Estilo: catálogo de uniformes premium, alta definição, cores fiéis.
```

## Sobre as cores

Cada modelo tem **uma** foto, numa cor de referência. A cartela de cores da
página continua funcionando como escolha do visitante (o nome da cor vai na
mensagem do WhatsApp), mas não repinta a foto — o texto de apoio abaixo dos
seletores já explica isso quando há foto no ar.

Sugestão de cor por linha, para as fotos ficarem coerentes com a cartela:
Portaria em azul marinho (`#1B2A45`), Zeladoria em azul royal (`#1D4ED8`) e ASG
em cinza claro (`#9AA1A9`).
