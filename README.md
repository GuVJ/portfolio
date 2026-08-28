# Portfólio — Gustavo Virgilio Joaquim

Site de portfólio profissional. Atende dois públicos na mesma página: quem contrata
CLT e quem contrata projeto fechado como PJ. O alternador do topo troca a proposta e
o CTA sem recarregar nada.

**No ar:** https://gustavovj.vercel.app

## Stack

| Camada | Escolha |
|---|---|
| Interface | React 18 + Vite 5 |
| Estilo | Tailwind CSS 3 (instalado no build, não por CDN) |
| Ícones | lucide-react |
| Hospedagem | Vercel |

Sem backend, sem banco e sem variável de ambiente — é um site estático.

## Design system

O layout segue o **FirstFinance** (`DESIGN_SYSTEM.md`): light-only, fundo `#F9F9F9`,
superfícies brancas com raio de 24px e sombra `0 2px 6px rgba(15,23,42,.04)`, primária
`#2F6FED`, CTA escuro em `slate-900` com texto em maiúscula e tracking largo.

Duas adaptações conscientes:

- **Tailwind entra no build, não por CDN.** O documento pede a tag `<script>` do CDN;
  aqui ele é instalado como dependência. O CSS resultante é o mesmo e não depende de
  rede em tempo de execução.
- **Container em 1100px, não em 1600px.** O valor do documento serve para tela de
  aplicação com sidebar. Este é um site de leitura corrida, e 1100px mantém a linha de
  texto em torno de 75 caracteres.

A Google Sans pedida pelo documento não existe publicamente no Google Fonts — o `<link>`
fica em `index.html` por conformidade, e quem sustenta a tipografia é a pilha de reserva
(`system-ui`).

## Conteúdo

Todo o texto do site vive em `src/dados/perfil.js`. Nenhum componente tem frase
escrita direto no JSX.

A fonte de verdade dos fatos é o currículo mestre em
`farol/dia-0/curriculo-mestre.json`. **Nada entra no site sem estar lá.** Em especial:
o valor de R$ 800 mil de redução em banco de horas está marcado como `_confirmar` no
arquivo de origem e por isso **não aparece no site** — o que aparece é a redução de
80%, que está textual no PDF do currículo sob a experiência da Dock.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # gera dist/
npm run preview  # serve o build
```

No Windows, o projeto mora dentro do OneDrive num caminho com acento. O atalho
`C:\Users\gusta\portfolio-dev.cmd` faz `chcp 65001` antes de subir o Vite — o caminho
curto 8.3 quebra o dev server.

## Assistente de projeto

A seção `#orcamento` faz cinco perguntas e devolve **escopo, prazo e entregas** —
mais um resumo pronto para o visitante enviar por WhatsApp ou e-mail.

**O site nunca mostra preço.** Foi decisão do Gustavo: valor solto na tela, sem
alguém para explicar o que está dentro dele, faz o cliente achar caro e sair. O
assistente qualifica e organiza; o número sai na conversa.

E não é só a tela que não mostra — **não existe preço no bundle**. `VALOR_HORA`,
piso, faixa e percentual de suporte vivem em `precos.private.js`, que está no
`.gitignore` e não é importado por nada dentro de `src/`. Esconder só da
interface seria cosmético: qualquer pessoa leria as constantes no devtools.

| Arquivo | O que tem | Vai para o navegador? |
|---|---|---|
| `src/dados/orcamento.js` | perguntas, horas por tipo, multiplicadores | sim |
| `src/logica/escopo.js` | horas → prazo, riscos, faseamento | sim |
| `precos.private.js` | valor hora, piso, faixa, suporte | **não** |
| `orcar.mjs` | converte escopo em reais | **não** (roda local) |

### Quando chega um lead

A mensagem que o cliente envia termina com uma linha `Ref.:` — a abreviação das
respostas que já estão escritas acima dela. Cole em:

```bash
node orcar.mjs ferramenta.varios.medio.sim.normal.suporte
```

e você tem faixa, horas, prazo e suporte na hora. Sem argumento, `node orcar.mjs`
imprime a tabela inteira de cenários para calibrar o preço.

Na primeira vez:

```bash
cp precos.exemplo.js precos.private.js
```

e ponha os seus valores — o `VALOR_HORA` do exemplo é referência de mercado, não
um número definido.

### IA opcional

`api/orcamento.js` chama a Gemini para escrever o comentário final e precisa de
`GEMINI_API_KEY` nas variáveis da Vercel. Sem a chave devolve 503 e o front cai
no texto local — o escopo aparece igual, só troca o selo de "Texto por IA" para
"Motor local". A função nunca recebe nem devolve valor. Para gravar a chave use
Git Bash, não pipe do PowerShell (o pipe prepende um BOM que quebra o header):

```bash
printf '%s' "SUA_CHAVE" | vercel env add GEMINI_API_KEY production
```

O `vercel.json` já exclui `/api/` do rewrite de SPA.

## Deploy

```bash
npm run deploy    # vercel --prod --yes
```

**Cuidado com o alias.** `gustavovj.vercel.app` e os outros apelidos
(`gustavo-virgilio`, `gustavovirgilio`) foram criados com `vercel alias set`, que
aponta para um deploy **especifico** — nao e dominio de projeto e nao acompanha
sozinho os deploys seguintes. Depois de cada `npm run deploy`, reaponte:

```bash
vercel alias set <url-do-novo-deploy> gustavovj.vercel.app
```

Se o site virar o `gustavovj.com.br` de verdade, isso deixa de ser necessario:
dominio proprio adicionado ao projeto passa a seguir a producao automaticamente.

## Estrutura

```
src/
  dados/perfil.js        todo o conteúdo do site
  componentes/ui.jsx     primitivos do design system
  secoes/                uma seção por arquivo
  App.jsx                composição das seções
```
