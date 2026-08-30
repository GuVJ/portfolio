import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { trajetoria } from '../dados/perfil.js'

export default function Trajetoria({ tom }) {
  return (
    <Secao
      tom={tom}
      id="trajetoria"
      rotulo="Trajetória"
      titulo="Sete anos, cinco operações."
    >
      <div className="space-y-4">
        {trajetoria.map((exp) => (
          <Card key={exp.empresa + exp.periodo} className="p-6 md:p-8">
            <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-semibold text-[var(--texto)]">{exp.empresa}</h3>
                  {exp.atual && <Pill tom="sucesso">Atual</Pill>}
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--acento)]">{exp.cargo}</p>
              </div>
              <div className="shrink-0 md:text-right">
                <p className="text-[13px] font-medium text-[var(--texto-suave)]">{exp.periodo}</p>
              </div>
            </div>

            <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-[var(--texto-suave)]">{exp.resumo}</p>


            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Secao>
  )
}
