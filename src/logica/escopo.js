// Motor de escopo. Funcao pura: mesmas respostas, mesmo resultado, sempre.
//
// Calcula HORAS, PRAZO e RISCOS — nunca dinheiro. Valor hora, piso e faixa nao
// existem neste arquivo nem em nenhum outro dentro de `src/`, porque tudo aqui
// vai parar no bundle publico e seria legivel no devtools. Para converter horas
// em reais existe `orcar.mjs`, que roda so na maquina do Gustavo e le
// `precos.private.js` (fora do repo).

import { HORAS_POR_SEMANA, PRAZO_MAXIMO_SEMANAS, TIPOS, PERGUNTAS } from '../dados/orcamento.js'

export function calcularEscopo(respostas) {
  const tipo = TIPOS.find((t) => t.id === respostas.tipo)
  if (!tipo) return null

  let horas = tipo.horas
  const alertas = []
  let temSuporte = false

  for (const pergunta of PERGUNTAS) {
    const escolhido = respostas[pergunta.id]
    if (!escolhido) continue

    const opcao = pergunta.opcoes.find((o) => o.id === escolhido)
    if (!opcao) continue

    if (typeof opcao.fator === 'number') horas *= opcao.fator
    if (typeof opcao.horasExtras === 'number') horas += opcao.horasExtras
    if (opcao.suporte) temSuporte = true
    if (opcao.alerta) alertas.push(opcao.alerta)
  }

  horas = Math.round(horas)
  const semanas = Math.max(1, Math.ceil(horas / HORAS_POR_SEMANA))

  // Projeto que nao cabe no calendario nao vira proposta unica e sim proposta
  // de fase 1. Prometer 8 meses de noites e fins de semana seria prometer o que
  // nao se cumpre, ainda mais quando a pessoa marcou urgencia.
  let fase1 = null
  if (semanas > PRAZO_MAXIMO_SEMANAS) {
    const horasFase1 = Math.round(HORAS_POR_SEMANA * (PRAZO_MAXIMO_SEMANAS * 0.6))
    fase1 = { horas: horasFase1, semanas: Math.ceil(horasFase1 / HORAS_POR_SEMANA) }
    alertas.push(
      `Do jeito que está descrito, o escopo inteiro passa de ${semanas} semanas — não cabe num projeto tocado fora do horário comercial. O caminho honesto é fasear: entrego primeiro a fatia que já gera decisão e o resto vira etapa 2.`,
    )
  }

  return { tipo, horas, semanas, temSuporte, alertas, fase1 }
}

// Resumo que a pessoa envia por WhatsApp ou e-mail. Sem valor: quem abre o
// aplicativo de mensagem e o proprio cliente, entao qualquer numero aqui seria
// numero na tela dele.
//
// A linha `Ref.` no fim e so a abreviacao das respostas que ja estao escritas
// acima — serve para o Gustavo colar em `node orcar.mjs` e ter a faixa na hora.
export function montarResumo(respostas, escopo, textoLivre) {
  const linhas = [`Projeto: ${escopo.tipo.rotulo}`]

  for (const pergunta of PERGUNTAS) {
    const escolhido = respostas[pergunta.id]
    if (!escolhido) continue
    const opcao = pergunta.opcoes.find((o) => o.id === escolhido)
    if (opcao) linhas.push(`${pergunta.pergunta} ${opcao.rotulo}`)
  }

  linhas.push('')
  linhas.push(`Prazo estimado: cerca de ${escopo.semanas} semana${escopo.semanas > 1 ? 's' : ''}`)
  if (escopo.fase1) {
    linhas.push(`Sugestão de fase 1: cerca de ${escopo.fase1.semanas} semanas`)
  }

  if (textoLivre && textoLivre.trim()) {
    linhas.push('')
    linhas.push(`O que trava hoje: ${textoLivre.trim()}`)
  }

  linhas.push('')
  linhas.push(`Ref.: ${montarCodigo(respostas)}`)

  return linhas.join('\n')
}

export function montarCodigo(respostas) {
  return [respostas.tipo, ...PERGUNTAS.map((p) => respostas[p.id])].filter(Boolean).join('.')
}
