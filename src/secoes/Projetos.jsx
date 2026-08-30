import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { projetos } from '../dados/perfil.js'

export default function Projetos({ tom }) {
  return (
    <Secao
      tom={tom}
      id="projetos"
      rotulo="Projetos"
      titulo="Construídos inteiros, do banco à tela."
      descricao="Os três têm IA generativa em produção — e nos três o número sai do banco, o modelo cuida só da linguagem."
    >
      <div className="space-y-4">
        {projetos.map((p) => (
          <Card key={p.nome} className="overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold text-[var(--texto)]">{p.nome}</h3>
                    <Pill tom={p.destaque ? 'info' : 'neutro'}>{p.tipo}</Pill>
                  </div>
                  <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-[var(--texto-suave)]">{p.resumo}</p>
                </div>

                {p.links.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--borda)] bg-[var(--superficie)] px-3.5 text-[13px] font-semibold text-[var(--texto)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
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
                <div className="mt-5 flex items-start gap-3 rounded-[16px] border border-[var(--acento-borda)] bg-[var(--acento-fundo)] p-4">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--acento)]" />
                  <p className="text-[13px] font-medium leading-relaxed text-[var(--texto)]">
                    Assistente, não robô: sugere e a pessoa decide. Nada sai sem alguém ler e clicar.
                  </p>
                </div>
              )}

              <ul className="mt-6 space-y-2.5">
                {p.detalhes.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--acento)]" />
                    <span className="text-sm leading-relaxed text-[var(--texto)]">{d}</span>
                  </li>
                ))}
              </ul>

            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-[var(--borda)] bg-[var(--superficie-2)] px-6 py-4 md:px-8">
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
