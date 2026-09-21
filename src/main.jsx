import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

import './fontes.css'

import './index.css'

const raiz = document.getElementById('root')
const arvore = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Em producao o HTML ja vem pronto do pre-render, entao hidratar aproveita o
// que esta na tela em vez de redesenhar tudo. No `vite dev` nao ha pre-render e
// o container chega vazio: ali o `hydrateRoot` nao tem o que hidratar e a
// pagina fica EM BRANCO. Uma linha de diferenca, e sem ela o dev server nao
// mostra nada.
if (raiz.hasChildNodes()) {
  hydrateRoot(raiz, arvore)
} else {
  createRoot(raiz).render(arvore)
}
