import { Check } from 'lucide-react'
import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { trajetoria } from '../dados/perfil.js'

export default function Trajetoria() {
  return (
    <Secao
      id="trajetoria"
      rotulo="Trajetória"
      titulo="Sete anos na mesma especialidade, em cinco operações diferentes."
      descricao="Banco, fintech, telecom e tecnologia. O que muda é a régua de maturidade do RH — o que se repete é entregar o dado que a liderança usa para decidir."
    >
      <div className="space-y-4">
        {trajetoria.map((exp) => (
          <Card key={exp.empresa + exp.periodo} className="p-6 md:p-8">
            <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-semibold text-[#0F172A]">{exp.empresa}</h3>
                  {exp.atual && <Pill tom="sucesso">Atual</Pill>}
                </div>
                <p className="mt-1 text-sm font-medium text-[#2F6FED]">{exp.cargo}</p>
              </div>
              <div className="shrink-0 md:text-right">
                <p className="text-[13px] font-medium text-[#6B7280]">{exp.periodo}</p>
                <p className="mt-0.5 text-[12px] text-[#6B7280]">{exp.setor}</p>
              </div>
            </div>

            <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-[#6B7280]">{exp.resumo}</p>

            {exp.destaques.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {exp.destaques.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#2F6FED]" />
                    <span className="text-sm leading-relaxed text-[#0F172A]">{d}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[#F5F5F5] pt-5">
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
