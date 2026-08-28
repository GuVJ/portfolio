import { GraduationCap } from 'lucide-react'
import { Secao, Card, Pill, CaixaIcone } from '../componentes/ui.jsx'
import { stack, formacao } from '../dados/perfil.js'

export default function StackFormacao() {
  return (
    <Secao
      id="stack"
      rotulo="Ferramentas e formação"
      titulo="O que eu uso, e de onde vem."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {stack.map((g) => (
          <Card key={g.grupo} className="p-6">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
              {g.grupo}
            </h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {g.itens.map((i) => (
                <Pill key={i}>{i}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {formacao.map((f) => (
          <Card key={f.curso} className="p-6">
            <CaixaIcone tom="neutro">
              <GraduationCap size={18} />
            </CaixaIcone>
            <p className="mt-4 text-[12px] font-medium uppercase tracking-wide text-[#9CA3AF]">
              {f.grau}
            </p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-[#0F172A]">{f.curso}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">{f.instituicao}</p>
            <p className="mt-1 text-[13px] text-[#9CA3AF]">{f.periodo}</p>
          </Card>
        ))}
      </div>
    </Secao>
  )
}
