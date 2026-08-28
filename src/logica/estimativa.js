// Motor de estimativa. Funcao pura: mesmas respostas, mesmo numero, sempre.
//
// A IA nao entra aqui. Ela conduz a conversa e escreve o texto em volta, mas o
// valor sai deste arquivo — do contrario o modelo cotaria preco diferente para
// o mesmo pedido, e um cliente poderia cobrar um numero que ninguem calculou.

import {
  VALOR_HORA,
  VALOR_MINIMO,
  FAIXA,
  HORAS_POR_SEMANA,
  PRAZO_MAXIMO_SEMANAS,
  TIPOS,
  PERGUNTAS,
} from '../dados/orcamento.js'

export function formatarBRL(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

// Arredonda para o meio-milhar mais proximo. Faixa com centavos passa a
// impressao de precisao que uma estimativa preliminar nao tem.
function arredondar(valor) {
  return Math.round(valor / 500) * 500
}

export function calcular(respostas) {
  const tipo = TIPOS.find((t) => t.id === respostas.tipo)
  if (!tipo) return null

  let horas = tipo.horas
  const alertas = []
  let percentualMensal = 0

  for (const pergunta of PERGUNTAS) {
    const escolhido = respostas[pergunta.id]
    if (!escolhido) continue

    const opcao = pergunta.opcoes.find((o) => o.id === escolhido)
    if (!opcao) continue

    if (typeof opcao.fator === 'number') horas *= opcao.fator
    if (typeof opcao.horasExtras === 'number') horas += opcao.horasExtras
    if (typeof opcao.mensal === 'number') percentualMensal = opcao.mensal
    if (opcao.alerta) alertas.push(opcao.alerta)
  }

  horas = Math.round(horas)

  const central = horas * VALOR_HORA
  const piso = arredondar(central * FAIXA.piso)
  const teto = arredondar(central * FAIXA.teto)
  const semanas = Math.max(1, Math.ceil(horas / HORAS_POR_SEMANA))

  // O suporte mensal e um percentual do valor construido, nao das horas — o
  // que se sustenta e o sistema pronto, nao o esforco de o ter feito.
  const mensal = percentualMensal ? arredondar(central * percentualMensal) : 0

  const abaixoDoMinimo = piso < VALOR_MINIMO

  // Projeto que nao cabe no calendario nao vira orcamento — vira proposta de
  // fase 1. Cotar 8 meses de noites e fins de semana seria prometer o que nao
  // se cumpre, ainda mais quando a pessoa marcou urgencia.
  let fase1 = null
  if (semanas > PRAZO_MAXIMO_SEMANAS) {
    const horasFase1 = Math.round(HORAS_POR_SEMANA * (PRAZO_MAXIMO_SEMANAS * 0.6))
    const centralFase1 = horasFase1 * VALOR_HORA
    fase1 = {
      horas: horasFase1,
      piso: Math.max(VALOR_MINIMO, arredondar(centralFase1 * FAIXA.piso)),
      teto: Math.max(VALOR_MINIMO, arredondar(centralFase1 * FAIXA.teto)),
      semanas: Math.ceil(horasFase1 / HORAS_POR_SEMANA),
    }
    alertas.push(
      `Do jeito que está descrito, o escopo inteiro passa de ${semanas} semanas — não cabe em projeto PJ tocado fora do horário comercial. O caminho honesto é fasear: entrego primeiro a fatia que já gera decisão e o resto vira etapa 2.`,
    )
  }

  return {
    tipo,
    horas,
    piso: abaixoDoMinimo ? VALOR_MINIMO : piso,
    teto: abaixoDoMinimo ? Math.max(VALOR_MINIMO, teto) : teto,
    semanas,
    mensal,
    alertas,
    abaixoDoMinimo,
    fase1,
  }
}

// Resumo em texto puro — vai no corpo do e-mail e do WhatsApp, e tambem e o
// contexto que a IA recebe para escrever o comentario final.
export function montarResumo(respostas, resultado, textoLivre) {
  const linhas = [`Projeto: ${resultado.tipo.rotulo}`]

  for (const pergunta of PERGUNTAS) {
    const escolhido = respostas[pergunta.id]
    if (!escolhido) continue
    const opcao = pergunta.opcoes.find((o) => o.id === escolhido)
    if (opcao) linhas.push(`${pergunta.pergunta} ${opcao.rotulo}`)
  }

  linhas.push('')
  linhas.push(
    `Faixa estimada: ${formatarBRL(resultado.piso)} a ${formatarBRL(resultado.teto)}`,
  )
  linhas.push(`Prazo estimado: cerca de ${resultado.semanas} semana${resultado.semanas > 1 ? 's' : ''}`)
  if (resultado.fase1) {
    linhas.push(
      `Sugestão de fase 1: ${formatarBRL(resultado.fase1.piso)} a ${formatarBRL(resultado.fase1.teto)} em cerca de ${resultado.fase1.semanas} semanas`,
    )
  }
  if (resultado.mensal) {
    linhas.push(`Suporte mensal: ${formatarBRL(resultado.mensal)} por mês`)
  }

  if (textoLivre && textoLivre.trim()) {
    linhas.push('')
    linhas.push(`O que trava hoje: ${textoLivre.trim()}`)
  }

  return linhas.join('\n')
}
