import { ArrowRight } from 'lucide-react'
import { Container, Botao } from '../componentes/ui.jsx'
import { pitch, numeros } from '../dados/perfil.js'

export default function Hero() {
  return (
    <section id="topo" className="pb-10 pt-10 md:pb-14 md:pt-16">
      <Container>
        <h1 className="max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#0F172A] md:text-[54px]">
          {pitch.titulo}
        </h1>

        <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-[#6B7280] md:text-lg">
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
              className="rounded-[20px] border border-[#F5F5F5] bg-white p-5"
              style={{ boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}
            >
              <dt className="text-[30px] font-bold leading-none tracking-tight text-[#0F172A]">
                {n.valor}
              </dt>
              <dd>
                <span className="mt-2 block text-[13px] font-semibold leading-snug text-[#0F172A]">
                  {n.rotulo}
                </span>
                <span className="mt-2 block text-[13px] leading-relaxed text-[#6B7280]">
                  {n.detalhe}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[13px] text-[#6B7280]">
          <a
            href="#cases"
            className="font-semibold text-[#255EDB] underline underline-offset-4 transition-all duration-150 hover:text-[#2F6FED]"
          >
            Ver cada um desses números por inteiro
          </a>{' '}
          — o que estava quebrado, o que eu construí e o que mudou.
        </p>
      </Container>
    </section>
  )
}
