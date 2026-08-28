// MODELO. Copie para `precos.private.js` e ponha os seus valores.
//
// `precos.private.js` esta no .gitignore e NAO e importado por nada dentro de
// `src/` — ou seja, nao entra no bundle que vai para o navegador. Quem abrir o
// devtools do site nao encontra nenhum destes numeros.
//
// Quem usa este arquivo: `orcar.mjs` (a calculadora que voce roda quando chega
// um lead) e `teste-estimativa.mjs`.
//
// O site mostra escopo, prazo e entregas — nunca valor. O valor sai na conversa,
// que e onde da para explicar o porque.

export const VALOR_HORA = 180

// Abaixo disto o projeto nao paga o custo de contexto (reuniao, levantamento,
// setup). Serve para voce decidir rapido se vale pegar.
export const VALOR_MINIMO = 3500

// Quanto a faixa abre para baixo e para cima em torno da estimativa central.
export const FAIXA = { piso: 0.85, teto: 1.35 }

// Suporte mensal como percentual do valor construido.
export const PERCENTUAL_SUPORTE = 0.12
