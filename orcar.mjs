// Calculadora de orcamento — roda so na sua maquina.
//
// Quando chega um lead pelo assistente, a mensagem traz uma linha `Ref.:` no
// fim. Cole ela aqui e voce tem a faixa na hora:
//
//   node orcar.mjs ferramenta.varios.medio.sim.normal.suporte
//
// Sem argumento, imprime a tabela inteira de cenarios para voce calibrar preco.
//
// O site NAO conhece nenhum destes numeros: `precos.private.js` esta fora do
// repo e nao e importado por nada dentro de `src/`.

import { calcularEscopo, montarCodigo } from './src/logica/escopo.js'
import { TIPOS, PERGUNTAS } from './src/dados/orcamento.js'

let precos
try {
  precos = await import('./precos.private.js')
} catch {
  console.error(
    '\nFalta o precos.private.js. Crie com:\n  cp precos.exemplo.js precos.private.js\ne ponha os seus valores.\n',
  )
  process.exit(1)
}

const { VALOR_HORA, VALOR_MINIMO, FAIXA, PERCENTUAL_SUPORTE } = precos

const brl = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const arredondar = (v) => Math.round(v / 500) * 500

function precificar(escopo) {
  const central = escopo.horas * VALOR_HORA
  const piso = Math.max(VALOR_MINIMO, arredondar(central * FAIXA.piso))
  const teto = Math.max(VALOR_MINIMO, arredondar(central * FAIXA.teto))
  const mensal = escopo.temSuporte ? arredondar(central * PERCENTUAL_SUPORTE) : 0
  const fase1 = escopo.fase1
    ? {
        semanas: escopo.fase1.semanas,
        piso: Math.max(VALOR_MINIMO, arredondar(escopo.fase1.horas * VALOR_HORA * FAIXA.piso)),
        teto: Math.max(VALOR_MINIMO, arredondar(escopo.fase1.horas * VALOR_HORA * FAIXA.teto)),
      }
    : null
  return { piso, teto, mensal, fase1, noPiso: arredondar(central * FAIXA.piso) < VALOR_MINIMO }
}

function decodificar(codigo) {
  const partes = codigo.split('.')
  const chaves = ['tipo', ...PERGUNTAS.map((p) => p.id)]
  const respostas = {}
  chaves.forEach((c, i) => {
    if (partes[i]) respostas[c] = partes[i]
  })
  return respostas
}

const codigo = process.argv[2]

if (codigo) {
  const respostas = decodificar(codigo)
  const escopo = calcularEscopo(respostas)

  if (!escopo) {
    console.error(`\nCódigo inválido: ${codigo}`)
    console.error(`Tipos válidos: ${TIPOS.map((t) => t.id).join(', ')}\n`)
    process.exit(1)
  }

  const p = precificar(escopo)

  console.log(`\n  ${escopo.tipo.rotulo}`)
  for (const pergunta of PERGUNTAS) {
    const o = pergunta.opcoes.find((x) => x.id === respostas[pergunta.id])
    if (o) console.log(`    ${pergunta.pergunta} ${o.rotulo}`)
  }
  console.log(`\n  ${brl(p.piso)} a ${brl(p.teto)}${p.noPiso ? '   [piso mínimo aplicado]' : ''}`)
  console.log(`  ${escopo.horas}h · cerca de ${escopo.semanas} semanas`)
  if (p.mensal) console.log(`  Suporte: ${brl(p.mensal)} por mês`)
  if (p.fase1) {
    console.log(`\n  Fase 1: ${brl(p.fase1.piso)} a ${brl(p.fase1.teto)} em ~${p.fase1.semanas} semanas`)
  }
  escopo.alertas.forEach((a) => console.log(`\n  ! ${a}`))
  console.log()
} else {
  console.log(`\n  Valor hora: ${brl(VALOR_HORA)}   Piso: ${brl(VALOR_MINIMO)}   Faixa: ${FAIXA.piso}x a ${FAIXA.teto}x\n`)
  const cenarios = [
    { tipo: 'dashboard', fonte: 'planilha', porte: 'pequeno', acesso: 'nao', prazo: 'tranquilo', depois: 'entrega' },
    { tipo: 'dashboard', fonte: 'banco', porte: 'medio', acesso: 'nao', prazo: 'normal', depois: 'entrega' },
    { tipo: 'automacao', fonte: 'planilha', porte: 'pequeno', acesso: 'nao', prazo: 'tranquilo', depois: 'entrega' },
    { tipo: 'ia', fonte: 'banco', porte: 'medio', acesso: 'nao', prazo: 'normal', depois: 'entrega' },
    { tipo: 'ferramenta', fonte: 'varios', porte: 'medio', acesso: 'sim', prazo: 'normal', depois: 'suporte' },
    { tipo: 'people', fonte: 'varios', porte: 'grande', acesso: 'sim', prazo: 'urgente', depois: 'suporte' },
  ]
  for (const r of cenarios) {
    const e = calcularEscopo(r)
    const p = precificar(e)
    console.log(
      `  ${String(e.horas).padStart(4)}h  ${String(e.semanas).padStart(2)}sem  ` +
        `${brl(p.piso).padStart(11)} a ${brl(p.teto).padStart(11)}` +
        `${p.mensal ? '  +' + brl(p.mensal) + '/mes' : ''}` +
        `${p.fase1 ? '  [fasear]' : ''}\n        ${montarCodigo(r)}`,
    )
  }
  console.log()
}
