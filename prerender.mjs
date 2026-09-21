// Injeta o HTML pre-renderizado no dist/index.html.
//
// Roda depois dos dois `vite build` (cliente e servidor). E deliberadamente
// burro: le o marcador `<div id="root"></div>`, troca pelo mesmo div com o
// conteudo dentro, e grava. Sem isso o arquivo servido tem 1.681 bytes e nenhum
// texto.

import { readFile, writeFile, rm } from 'node:fs/promises'
import { renderizar } from './dist-servidor/entrada-servidor.js'

const MARCADOR = '<div id="root"></div>'

const html = await readFile('dist/index.html', 'utf-8')
if (!html.includes(MARCADOR)) {
  throw new Error(`Nao achei ${MARCADOR} em dist/index.html. O pre-render nao foi aplicado.`)
}

const conteudo = renderizar()
await writeFile('dist/index.html', html.replace(MARCADOR, `<div id="root">${conteudo}</div>`), 'utf-8')

// A pasta do bundle de servidor nao precisa ir pro deploy.
await rm('dist-servidor', { recursive: true, force: true })

const palavras = (conteudo.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length
console.log(`pre-render aplicado: ${conteudo.length} bytes de HTML, ~${palavras} palavras no arquivo servido`)
