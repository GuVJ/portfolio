// Entrada de pre-renderizacao.
//
// O site e um SPA: o HTML servido era so `<div id="root"></div>` e as 937
// palavras da pagina so existiam depois do JavaScript rodar. Crawler que nao
// executa JS via uma pagina vazia, e isso inclui boa parte dos bots de IA e o
// indice do Bing, de onde o ChatGPT puxa resultado.
//
// Aqui o React roda no build e devolve o HTML pronto, que o `prerender.mjs`
// injeta no index.html. No navegador, o `main.jsx` hidrata esse HTML em vez de
// jogar fora e desenhar de novo.

import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function renderizar() {
  return renderToString(<App />)
}
