import { BarChart3, Cog, Boxes, Users, Sparkles, HardHat, ArrowRight } from 'lucide-react'
import { Secao, Card, CaixaIcone, BotaoEscuro } from '../componentes/ui.jsx'
import { servicos } from '../dados/perfil.js'

const ICONES = [BarChart3, Cog, Boxes, Users, Sparkles, HardHat]

export default function Servicos() {
  return (
    <Secao
      id="servicos"
      rotulo="Projetos PJ"
      titulo="O que eu entrego como projeto fechado."
      descricao="Escopo definido, prazo combinado e a coisa no ar. Trabalho de ponta a ponta: converso com quem vai usar, trato o dado, construo e entrego funcionando — sem depender de um time inteiro para começar."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => {
          const Icone = ICONES[i]
          return (
            <Card key={s.titulo} className="flex flex-col p-6" comHover>
              <CaixaIcone tom="neutro">
                <Icone size={18} />
              </CaixaIcone>
              <h3 className="mt-4 text-base font-semibold text-[#0F172A]">{s.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{s.texto}</p>
            </Card>
          )
        })}
      </div>

      <Card className="mt-4 bg-slate-900 p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[52ch]">
            <h3 className="text-xl font-semibold text-white">
              Tem um processo que ainda roda na mão?
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              Me conta o que trava hoje. Se der para resolver, eu digo como e quanto tempo leva. Se
              não der, eu digo isso também — de graça e sem rodeio.
            </p>
          </div>
          <BotaoEscuro
            href="#contato"
            className="shrink-0 border border-white/15 bg-white text-slate-900 hover:bg-slate-100"
          >
            Descrever meu caso <ArrowRight size={14} />
          </BotaoEscuro>
        </div>
      </Card>
    </Secao>
  )
}
