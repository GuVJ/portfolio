# Portfólio — Gustavo Virgilio Joaquim

Site de portfólio profissional. Atende dois públicos na mesma página: quem contrata
CLT e quem contrata projeto fechado como PJ. O alternador do topo troca a proposta e
o CTA sem recarregar nada.

**No ar:** https://portfolio-gustavo.vercel.app

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

## Estrutura

```
src/
  dados/perfil.js        todo o conteúdo do site
  componentes/ui.jsx     primitivos do design system
  secoes/                uma seção por arquivo
  App.jsx                composição das seções
```
