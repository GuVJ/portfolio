// Injeta o HTML pre-renderizado no dist/index.html, e de quebra o preload da
// fonte principal.
//
// Roda depois dos dois `vite build` (cliente e servidor). E deliberadamente
// burro: acha o marcador `<div id="root"></div>`, troca pelo mesmo div com o
// conteudo dentro, e grava. Sem isso o arquivo servido tem 1.681 bytes e nenhum
// texto, porque o site e um SPA e crawler que nao executa JS via pagina vazia.

import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { renderizar } from './dist-servidor/entrada-servidor.js'

const MARCADOR = '<div id="root"></div>'

let html = await readFile('dist/index.html', 'utf-8')
if (!html.includes(MARCADOR)) {
  throw new Error(`Nao achei ${MARCADOR} em dist/index.html. O pre-render nao foi aplicado.`)
}

// --- preload da fonte de corpo ---------------------------------------------
// Sem isto existe uma cascata: baixa o HTML, baixa o CSS, parseia o CSS, SO
// ENTAO descobre a fonte e comeca a baixar. O preload dispara junto com o CSS.
//
// So a Inter entra. A JetBrains Mono aparece em nove rotulos pequenos, e
// colocar 21 kB no caminho critico por causa deles nao paga: ela carrega logo
// depois e troca, que e o que `font-display: swap` faz.
const assets = await readdir('dist/assets')
const inter = assets.find((a) => a.startsWith('inter-') && a.endsWith('.woff2'))

if (inter) {
  html = html.replace(
    '</head>',
    `  <link rel="preload" href="/assets/${inter}" as="font" type="font/woff2" crossorigin />\n  </head>`,
  )
} else {
  console.warn('aviso: nao achei o woff2 da Inter em dist/assets, preload nao foi injetado')
}

// --- conteudo ---------------------------------------------------------------
const conteudo = renderizar()
html = html.replace(MARCADOR, `<div id="root">${conteudo}</div>`)

await writeFile('dist/index.html', html, 'utf-8')

// A pasta do bundle de servidor nao precisa ir pro deploy.
await rm('dist-servidor', { recursive: true, force: true })

const palavras = (conteudo.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length
console.log(
  `pre-render aplicado: ${conteudo.length} bytes de HTML, ~${palavras} palavras no arquivo servido` +
    (inter ? `\npreload da fonte: ${inter}` : ''),
)
