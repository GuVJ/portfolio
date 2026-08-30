import { Search, Database, Wrench, Activity } from 'lucide-react'
import { Secao, Card, CaixaIcone } from '../componentes/ui.jsx'
import { comoTrabalho } from '../dados/perfil.js'

const ICONES = [Search, Database, Wrench, Activity]

export default function ComoTrabalho({ tom }) {
  return (
    <Secao
      tom={tom}
      id="metodo"
      rotulo="Como eu trabalho"
      titulo="O problema raramente é falta de gráfico."
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
                  <h3 className="text-base font-semibold text-[var(--texto)]">{etapa.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--texto-suave)]">{etapa.texto}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

    </Secao>
  )
}
