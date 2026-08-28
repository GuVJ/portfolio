import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { casesProfissionais } from '../dados/perfil.js'

// Cada case é contado em três tempos — problema, o que eu fiz, resultado.
// Número solto não convence ninguém: "80%" só vira argumento quando vem junto
// do que estava quebrado antes.
const BLOCOS = [
  { chave: 'problema', rotulo: 'O problema' },
  { chave: 'acao', rotulo: 'O que eu fiz' },
  { chave: 'resultado', rotulo: 'O resultado' },
]

export default function Cases() {
  return (
    <Secao
      id="cases"
      rotulo="Cases"
      titulo="Quatro problemas reais, e o que sobrou depois."
      descricao="Sem número solto: cada um começa pelo que estava quebrado, passa pelo que eu construí e termina no que mudou na operação."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {casesProfissionais.map((c) => (
          <Card key={c.titulo} className="flex flex-col p-6 md:p-8" comHover>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#255EDB]">
                {c.empresa}
              </span>
              <span className="text-[11px] font-medium text-[#6B7280]">{c.periodo}</span>
            </div>

            <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0F172A] md:text-xl">
              {c.titulo}
            </h3>

            <div className="mt-5 flex items-baseline gap-3 rounded-[16px] bg-[#F8FAFC] px-5 py-4">
              <span className="text-[30px] font-bold leading-none tracking-tight text-[#0F172A]">
                {c.metrica}
              </span>
              <span className="text-[13px] font-medium leading-snug text-[#6B7280]">
                {c.metricaRotulo}
              </span>
            </div>

            <dl className="mt-6 flex flex-col gap-4">
              {BLOCOS.map((b) => (
                <div key={b.chave}>
                  <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {b.rotulo}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-[#0F172A]">{c[b.chave]}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[#F5F5F5] pt-5">
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
