// Conferencia do motor de estimativa. Roda com: node teste-estimativa.mjs
import { calcular, formatarBRL, montarResumo } from './src/logica/estimativa.js'

const casos = [
  ['Dashboard enxuto | planilha | sem login | sem pressa', {tipo:'dashboard',fonte:'planilha',porte:'pequeno',acesso:'nao',prazo:'tranquilo',depois:'entrega'}],
  ['Dashboard medio  | banco    | sem login | algumas semanas', {tipo:'dashboard',fonte:'banco',porte:'medio',acesso:'nao',prazo:'normal',depois:'entrega'}],
  ['Automacao enxuta | planilha | sem login | sem pressa', {tipo:'automacao',fonte:'planilha',porte:'pequeno',acesso:'nao',prazo:'tranquilo',depois:'entrega'}],
  ['Ferramenta media | varios   | com login | suporte', {tipo:'ferramenta',fonte:'varios',porte:'medio',acesso:'sim',prazo:'normal',depois:'suporte'}],
  ['People grande    | varios   | com login | urgente | suporte', {tipo:'people',fonte:'varios',porte:'grande',acesso:'sim',prazo:'urgente',depois:'suporte'}],
  ['IA acoplada      | banco    | sem login | algumas semanas', {tipo:'ia',fonte:'banco',porte:'medio',acesso:'nao',prazo:'normal',depois:'entrega'}],
]

for (const [nome, r] of casos) {
  const e = calcular(r)
  console.log('\n' + nome)
  console.log('   ' + String(e.horas).padStart(3) + 'h  ' + formatarBRL(e.piso) + ' a ' + formatarBRL(e.teto)
    + '  ~' + e.semanas + ' sem' + (e.mensal ? '  mensal ' + formatarBRL(e.mensal) : '')
    + (e.abaixoDoMinimo ? '   [PISO MINIMO]' : ''))
  e.alertas.forEach(a => console.log('   ! ' + a.slice(0, 76)))
}

console.log('\n=== resumo de exemplo ===')
const r = {tipo:'ferramenta',fonte:'varios',porte:'medio',acesso:'sim',prazo:'normal',depois:'suporte'}
console.log(montarResumo(r, calcular(r), 'Hoje a aprovacao roda por e-mail e planilha, e ninguem sabe onde parou.'))
