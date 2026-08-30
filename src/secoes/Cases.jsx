import { ArrowUpRight } from 'lucide-react'
import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { casesProfissionais } from '../dados/perfil.js'

// Uma frase de contexto e três linhas de resultado. Parágrafo explicando o
// problema ninguém lê num portfólio — o que convence é o número junto do que
// estava quebrado, e isso cabe numa linha.
export default function Cases({ tom }) {
  return (
    <Secao tom={tom} id="cases" rotulo="Cases" titulo="Quatro problemas, quatro resultados.">
      <div className="grid gap-4 lg:grid-cols-2">
        {casesProfissionais.map((c) => (
          <Card key={c.titulo} className="flex flex-col p-6 md:p-8" comHover>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--acento)]">
                {c.empresa}
              </span>
              <span className="text-[11px] font-medium text-[var(--texto-suave)]">{c.periodo}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--texto)] md:text-xl">
              {c.titulo}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[var(--texto-suave)]">{c.resumo}</p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {c.resultados.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-[var(--acento)]" />
                  <span className="text-sm font-semibold leading-snug text-[var(--texto)]">{r}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {c.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Secao>
  )
}
