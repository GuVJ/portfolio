import { Search, Database, Wrench, Activity } from 'lucide-react'
import { Secao, Card, CaixaIcone } from '../componentes/ui.jsx'
import { comoTrabalho, casesProfissionais } from '../dados/perfil.js'

const ICONES = [Search, Database, Wrench, Activity]

export default function ComoTrabalho() {
  return (
    <Secao
      id="metodo"
      rotulo="Como eu trabalho"
      titulo="A maior parte dos problemas de RH não é falta de gráfico."
      descricao="É falta de processo, de dado confiável ou de alguém que traduza a pergunta da liderança em número. Meu trabalho começa antes do dashboard e termina depois dele."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {comoTrabalho.map((etapa, i) => {
          const Icone = ICONES[i]
          return (
            <Card key={etapa.titulo} className="p-6" comHover>
              <div className="flex items-start gap-4">
                <CaixaIcone tom="info">
                  <Icone size={18} />
                </CaixaIcone>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A]">{etapa.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{etapa.texto}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-12">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Três entregas que resumem isso
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {casesProfissionais.map((c) => (
            <Card key={c.titulo} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-[#0F172A]">{c.titulo}</h3>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                  {c.empresa}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{c.texto}</p>
            </Card>
          ))}
        </div>
      </div>
    </Secao>
  )
}
