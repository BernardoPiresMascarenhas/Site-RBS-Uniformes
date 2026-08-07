# Levantamento com o dono da RBS Uniformes

Tudo que hoje está preenchido com dado fictício ou com afirmação que **eu escrevi
sem confirmar**. Cada item diz onde a resposta entra no código.

Prioridade:
🔴 impede publicar · 🟠 risco de prometer o que a empresa não faz · 🟡 melhora o site

---

## 1. Contato 🔴

Tudo isso está fictício em `lib/site.ts`. Hoje o botão de orçamento leva para um
número que não existe — **é o item mais urgente**, porque o site inteiro converte
por WhatsApp.

- [ ] Telefone fixo e/ou celular de atendimento — qual aparece no site?
- [ ] O WhatsApp é o mesmo número? É WhatsApp Business?
- [ ] E-mail de contato (o site usa `contato@rbsuniformes.com.br` como exemplo)
- [ ] Endereço completo: rua, número, complemento, bairro, cidade, UF, CEP
- [ ] O endereço é loja/showroom que recebe cliente, ou só fábrica/escritório?
      (se não recebe visita, é melhor não publicar o endereço completo)
- [ ] Horário de atendimento — inclui sábado?
- [ ] Redes sociais: links reais de Instagram, Facebook e LinkedIn.
      Tem alguma que **não** existe? Removo do rodapé em vez de deixar link morto.
- [ ] Tem mais de uma unidade?

## 2. Identificação da empresa 🔴

- [ ] Razão social exata (hoje: “RBS Uniformes Ltda”)
- [ ] CNPJ — costuma ir no rodapé e passa credibilidade em venda B2B
- [ ] Inscrição estadual, se quiser exibir
- [ ] O nome comercial é “RBS Uniformes” mesmo, ou tem algo antes/depois?

## 3. Números que o site afirma 🟠

Estão em `site.stats` e aparecem em destaque logo abaixo do hero. **Eu inventei
todos** só para preencher o layout:

| Está escrito | Perguntar |
| --- | --- |
| +15 anos de mercado | Ano de fundação |
| +500 empresas atendidas | Quantos clientes ativos / já atendidos? |
| +200 mil peças por ano | Capacidade produtiva real (peças/mês ou /ano) |
| 100% das peças conferidas | A conferência é peça a peça mesmo, ou por lote/amostragem? |

- [ ] Se algum número não existir ou for baixo, prefere trocar por outro dado
      (nº de funcionários, m² de fábrica, nº de máquinas) ou tirar a faixa?

> Número inflado em site B2B é fácil de desmentir numa visita e derruba a
> confiança justamente no cliente grande. Melhor um número menor e verdadeiro.

## 4. O que a empresa realmente faz 🟠

Escrevi a seção “Diferenciais” e o FAQ com o que é padrão no setor. Cada linha
abaixo é uma **promessa ao cliente** — precisa confirmar uma por uma
(`lib/content.ts`):

- [ ] **Confecção própria?** O hero da V1 diz “Confecção própria” e a V2 diz
      “Fábrica própria”. A RBS costura, ou terceiriza e faz a personalização?
      (se terceiriza, mudo o texto — não dá para manter)
- [ ] **Bordado e silk são feitos internamente?** O site afirma que sim
      (“bordado computadorizado, silkscreen, transfer e etiquetas personalizadas
      feitos internamente”)
- [ ] **Peça piloto antes da produção** — é sempre, ou só em pedido grande?
- [ ] **Modelagem plus size e feminina** — tem grade completa?
- [ ] **Cronograma por escrito e status por etapa** — existe esse processo?
- [ ] **Fornecedores homologados / teste de encolhimento e solidez de cor** —
      existe esse controle ou é promessa demais?
- [ ] **Estoque de reposição / ficha técnica arquivada** para repor peça anos
      depois — a RBS faz isso?
- [ ] **Consultor dedicado** do briefing ao pós-venda — quantas pessoas atendem?

## 5. Catálogo 🟠

Hoje há 6 linhas (`categories` em `lib/content.ts`): Corporativos, Industriais,
Hospitalares, Escolares, Gastronomia/Hotelaria, Esportivos/Promocionais.

- [ ] A RBS atende todas essas linhas? Alguma **não** faz? (tirar da lista)
- [ ] Falta alguma linha que ela faz e não está aí?
- [ ] Qual linha é a mais forte / a que ele mais quer vender? (essa vai primeiro)
- [ ] Faz uniforme com certificação NR (NR-10 arco elétrico, NR-13, antichama)?
      O site cita “Camisas NR” — isso exige certificado, não pode ser genérico.
- [ ] Vende EPI junto (botina, capacete, luva) ou só vestuário?
- [ ] Trabalha com quais tecidos principais? (brim, oxford, malha PV, tricoline…)

## 6. Condições comerciais 🟠

O FAQ hoje responde de forma vaga porque eu não sabia os números:

- [ ] **Pedido mínimo** — quantas peças? Varia por linha?
- [ ] **Prazo de produção** médio (ex.: 15 a 25 dias úteis)
- [ ] **Formas de pagamento** — parcela? boleto? faturado para empresa?
- [ ] **Frete** — entrega em quais regiões? Frete grátis acima de X?
- [ ] Atende **todo o Brasil** mesmo? (a V2 afirma isso no hero)
- [ ] Faz **amostra/mostruário** antes de fechar? É cobrada?
- [ ] Política de troca/defeito

## 7. Materiais que preciso receber 🔴

- [ ] **Logo em vetor** (`.ai`, `.eps`, `.svg` ou `.pdf`). Hoje só tenho PNG/JPEG
      e tive que recortar o fundo na mão. Em vetor a logo fica nítida em
      qualquer tamanho e o arquivo pesa quase nada.
- [ ] **Fotos reais**: peças prontas de cada linha, fábrica/oficina, equipe.
      Hoje o catálogo usa ícones e blocos de cor no lugar das fotos.
- [ ] Se não houver fotos: dá para agendar um ensaio? É o que mais muda a
      percepção de qualidade num site de uniforme.
- [ ] Logos de clientes que a RBS pode exibir (com autorização deles)
- [ ] Depoimentos reais de clientes — **não coloquei nenhum de propósito**,
      porque depoimento inventado é falso e pega mal. Se ele conseguir 3 ou 4
      reais (nome, empresa, cargo, autorização), eu monto a seção.
- [ ] Certificações, selos ou prêmios que ele tenha

## 8. Jurídico e LGPD 🔴

O formulário coleta nome, empresa, telefone e e-mail — isso é dado pessoal.

- [ ] Quem recebe os dados do formulário? Vai só para o WhatsApp ou entra em
      algum CRM/planilha?
- [ ] Precisamos de uma **Política de Privacidade** (LGPD). Ele tem uma, ou eu
      escrevo um modelo para o advogado dele revisar?
- [ ] Quer aviso de cookies? (só é necessário se instalarmos Analytics/Pixel)

## 9. Técnico 🟡

- [ ] **Domínio**: já tem? Qual? Quem controla o registro no Registro.br?
- [ ] Quer e-mail profissional no domínio (`contato@…`)?
- [ ] Já usa Google Analytics, Google Ads ou Pixel do Meta? Passar os IDs
- [ ] Tem Google Meu Negócio? (para colocar o mapa e o link de avaliações)
- [ ] Onde vai hospedar? (recomendo Vercel — é grátis nesse porte e o projeto
      já está pronto para lá)

## 10. Decisão de identidade 🔴

- [x] **V1 (Premium/escura) ou V2 (Corporativa/clara)?** → **V1, Premium.**
      A versão corporativa, o seletor V1/V2 e a página de comparação já foram
      removidos do código.
- [ ] Confirmar qual arte da logo é a definitiva (hoje o site usa
      `logopremiumtransparente1.png`).
- [ ] Tem manual de marca / cores oficiais definidas?

---

## Perguntas de estratégia (valem mais que o resto)

- [ ] **Quem é o cliente ideal?** Indústria grande com contrato anual? Escola?
      Restaurante pequeno? O texto do site muda bastante conforme a resposta.
- [ ] **Por que os clientes escolhem a RBS e não o concorrente?** A resposta dele
      aqui deve virar o título do hero — hoje está com um texto genérico que eu
      escrevi.
- [ ] Qual o **ticket médio** e o tamanho de pedido que ele quer atrair?
- [ ] O site é para **gerar orçamento** ou só para dar credibilidade quando ele
      já está negociando? (muda o peso do formulário na página)
- [ ] Quem são os concorrentes que ele admira?

---

### Depois da reunião

A maior parte das respostas entra em dois arquivos:

- `lib/site.ts` — contato, endereço, redes, números
- `lib/content.ts` — catálogo, diferenciais, processo, FAQ, textos institucionais

Fotos e logo vetorial vão em `public/`. Nada disso exige mexer em componente.
