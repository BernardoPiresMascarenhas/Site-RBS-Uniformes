# Site RBS Uniformes

Site institucional da **RBS Uniformes** em Next.js 14 (App Router), TypeScript e
Tailwind CSS.

Identidade **Premium / Dark** — preto, ouro metálico, vermelho e esmeralda —
servida em `/`.

> O projeto nasceu com duas identidades para o cliente comparar (`/v1` premium e
> `/v2` corporativa). A versão corporativa foi descartada e removida do código; o
> que sobrou é o site premium, agora na raiz.

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm start
```

## Paleta extraída da logo

As cores não foram estimadas: foram amostradas diretamente do arquivo da logo.

| Token | Hex | Onde aparece na logo |
| --- | --- | --- |
| Ouro | `#C9A227` | corpo do sol e contorno das letras |
| Ouro claro | `#E3CE94` / `#EFE2B6` | brilho do disco solar |
| Bronze | `#8A6C14` | acento sobre as seções claras |
| Vermelho | `#D62026` | “RBS” e “UNIFORMES” |
| Esmeralda | `#0A7A44` → `#013C1E` | montanhas texturizadas |
| Preto | `#050505` | fundo |
| Marfim | `#FAF8F3` | seções claras (não está na logo) |

> O ouro do site é uma versão **dessaturada** do ouro da arte (`#FCB609`). Em
> áreas grandes o tom original vibra demais; `#C9A227` mantém a leitura de metal
> nobre sem dominar o layout. O mesmo vale para o vermelho.

## Arquivos de logo

A logo é aplicada **solta, sem moldura**, em tamanho grande (navbar `h-24`,
rodapé `h-28`). Para isso, o fundo chapado do arquivo original foi recortado:

| Arquivo | Uso |
| --- | --- |
| `logopremiumtransparente1.png` | usado no site |
| `logo-premium-transparente.png` | recorte anterior, preservado |
| `logo-premium.png` | original com fundo chapado, para material impresso |

O recorte foi feito por flood fill a partir das bordas, então só o fundo
conectado ficou transparente — os contornos escuros internos foram preservados. O
tamanho é controlado pela prop `sizeClassName` do `<Logo />` (altura; largura em
`auto`), e a proporção declarada em `lib/theme.ts` (`width`/`height`) precisa
bater com a do arquivo, senão o `next/image` reserva espaço errado.

Como a arte já contém “RBS UNIFORMES”, o wordmark em texto ao lado vem
desligado. Para reativá-lo: `<Logo showWordmark />`.

## Como o sistema de temas funciona

Uma **única** escala de cores semântica (`brand-*`) alimentada por CSS custom
properties:

```
app/globals.css        → define os tokens das superfícies escura e clara
tailwind.config.ts     → mapeia brand-bg, brand-primary, brand-surface… para as variáveis
components/SiteShell   → monta navbar + main + footer
```

Como os tokens guardam canais RGB crus (`--c-accent: 201 162 39`), os
modificadores de opacidade do Tailwind continuam funcionando
(`bg-brand-accent/20`).

### Superfícies claras e escuras

O site não é todo preto: ele alterna faixas escuras e claras. Isso é feito com um
segundo jogo de tokens ativado pelo atributo `data-surface`, que pode aparecer em
qualquer ponto da árvore:

```tsx
<Section surface="light">   {/* marfim, texto grafite, acento bronze */}
  <div data-surface="dark"> {/* card preto dentro da seção clara */}
```

Ordem das faixas: Hero **escuro** → Números **escuro** → Catálogo **claro** →
Sobre **claro** → Diferenciais **claro** → Processo **escuro** → Segmentos
**escuro** → FAQ **claro** → Contato **claro** → Rodapé **preto**.

Três coisas mudam junto com a superfície e por isso ficam em variáveis, não em
classes fixas:

| Variável | Escuro | Claro |
| --- | --- | --- |
| `--c-accent` | ouro `#C9A227` | bronze `#8A6C14` |
| `--sheen` (texto metálico, `.text-accent-sheen`) | degradê ouro | degradê bronze |
| `--btn-primary-bg` / `-fg` | ouro sobre preto | grafite com letra champanhe |

Por isso as seções usam `text-brand-accent` e `.text-accent-sheen` em vez de
`text-premium-gold` — só os blocos que são **sempre** escuros (hero, rodapé,
navbar) usam as cores literais.

Além das cores, `lib/theme.ts` concentra as decisões **estruturais** da estética
(estilo de card, eyebrow, divisor, campo de formulário, faixa de números), para
que as seções não repitam as mesmas listas de classe.

Tipografia: **Cinzel** no display (ar de marca de luxo) e **Inter** no corpo —
via `next/font`.

## Estrutura

```
app/
  layout.tsx          fontes, metadata global
  page.tsx            o site
  globals.css         tokens das superfícies escura e clara
components/
  HomePage.tsx        ordem das seções
  SiteShell.tsx       casca: navbar + main + footer + FAB
  Navbar.tsx          navegação responsiva com menu mobile
  Footer.tsx          links úteis, contato, redes sociais
  QuoteForm.tsx       formulário de orçamento com validação
  Logo.tsx            logo da marca
  WhatsAppFab.tsx     botão flutuante de WhatsApp
  decor/Scenery.tsx   SVGs de montanhas e sol (ecos da logo)
  sections/           Hero, Stats, Catalog, About, Differentials,
                      Process, Sectors, Faq, Contact
  ui/                 Button e Section/Container/SectionHeading
lib/
  site.ts             dados da empresa e helper do WhatsApp
  content.ts          catálogo, diferenciais, processo, FAQ, textos
  theme.ts            logo, tokens estruturais e destaques do hero
  utils.ts            cn() = clsx + tailwind-merge
```

## Seções

Header/Navbar · Hero com CTA de orçamento · Faixa de números · Catálogo (6 linhas
de uniformes) · Sobre a RBS · Diferenciais · Como funciona (4 etapas) · Segmentos
atendidos · FAQ · Contato + formulário de orçamento · Footer.

## Formulário de orçamento

`components/QuoteForm.tsx` valida os campos no cliente e monta uma mensagem
estruturada que abre no WhatsApp da empresa (`wa.me`) — não exige backend.

Para trocar por um envio real (e-mail, CRM), substitua o corpo de `handleSubmit`
por um `fetch` para uma route handler em `app/api/`.

## ⚠️ Antes de publicar

Estes dados são **placeholders** e precisam ser substituídos:

- `lib/site.ts` — telefone, número do WhatsApp (formato `55DDXXXXXXXXX`), e-mail,
  endereço, horário, redes sociais e os números institucionais em `stats`
  (“+15 anos”, “+500 empresas”…). Nada disso foi verificado; são valores de
  preenchimento de layout.
- Fotos reais: o bloco visual da seção Sobre está marcado com um comentário no
  código indicando onde entra a `<Image />` do catálogo.
- `public/logopremiumtransparente1.png` tem ~2,6 MB. Vale converter para WebP
  antes de publicar.
