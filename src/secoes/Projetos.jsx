import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { projetos } from '../dados/perfil.js'

export default function Projetos() {
  return (
    <Secao
      id="projetos"
      rotulo="Projetos"
      titulo="Coisas que eu construí inteiras, do banco de dados à tela."
      descricao="Nem todo analista de dados escreve o sistema que gera o dado. Esses três existem, estão em produção ou têm código aberto, e cada um resolveu um problema diferente."
    >
      <div className="space-y-4">
        {projetos.map((p) => (
          <Card key={p.nome} className="overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold text-[#0F172A]">{p.nome}</h3>
                    <Pill tom={p.destaque ? 'info' : 'neutro'}>{p.tipo}</Pill>
                  </div>
                  <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-[#6B7280]">{p.resumo}</p>
                </div>

                {p.links.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#F5F5F5] bg-white px-3.5 text-[13px] font-semibold text-[#0F172A] transition-all duration-150 hover:bg-[#F1F5F9]"
                      >
                        {l.rotulo} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* O card do assistente ganha um aviso proprio: para quem le, a
                  primeira duvida e se a coisa age sozinha. A resposta vem antes
                  da pergunta. */}
              {p.destaque && (
                <div className="mt-5 flex items-start gap-3 rounded-[16px] border border-[#DCE8FF] bg-[#EAF1FF] p-4">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#2F6FED]" />
                  <p className="text-[13px] font-medium leading-relaxed text-[#0F172A]">
                    Assistente, não robô. O sistema sugere e a pessoa decide — nenhuma mensagem sai
                    sem alguém ler e clicar, e a confirmação é deliberada em dois passos.
                  </p>
                </div>
              )}

              <ul className="mt-6 space-y-2.5">
                {p.detalhes.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F6FED]" />
                    <span className="text-sm leading-relaxed text-[#0F172A]">{d}</span>
                  </li>
                ))}
              </ul>

              {p.nota && <p className="mt-5 text-[13px] italic leading-relaxed text-[#9CA3AF]">{p.nota}</p>}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-[#F5F5F5] bg-[#F8FAFC] px-6 py-4 md:px-8">
              {p.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Secao>
  )
}
