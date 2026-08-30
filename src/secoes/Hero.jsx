import { ArrowRight } from 'lucide-react'
import { Container, Botao } from '../componentes/ui.jsx'
import { pitch, numeros } from '../dados/perfil.js'

export default function Hero() {
  return (
    <section id="topo" className="tema-escuro bg-[var(--fundo)] pb-14 pt-14 md:pb-20 md:pt-20">
      <Container>
        <h1 className="max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[var(--texto)] md:text-[54px]">
          {pitch.titulo}
        </h1>

        <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-[var(--texto-suave)] md:text-lg">
          {pitch.texto}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {pitch.acoes.map((a) => (
            <Botao key={a.alvo} href={a.alvo} tom={a.principal ? 'escuro' : 'claro'}>
              {a.rotulo}
              {a.principal && <ArrowRight size={14} />}
            </Botao>
          ))}
        </div>

        {/* Cada número vem com a frase que explica de onde ele saiu. Número sem
            procedência ao lado é só enfeite — e é a primeira coisa que um
            entrevistador pergunta. */}
        <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n) => (
            <div
              key={n.rotulo}
              className="rounded-[20px] border border-[var(--borda)] bg-[var(--superficie)] p-5"
              style={{ boxShadow: 'var(--sombra)' }}
            >
              <dt className="text-[30px] font-bold leading-none tracking-tight text-[var(--texto)]">
                {n.valor}
              </dt>
              <dd>
                <span className="mt-2 block text-[13px] font-semibold leading-snug text-[var(--texto)]">
                  {n.rotulo}
                </span>
                <span className="mt-2 block text-[13px] leading-relaxed text-[var(--texto-suave)]">
                  {n.detalhe}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
