import { ArrowRight } from 'lucide-react'
import { Container, Botao } from '../componentes/ui.jsx'
import { pitch, numeros } from '../dados/perfil.js'

export default function Hero() {
  return (
    <section
      id="topo"
      className="tema-escuro relative overflow-hidden bg-[var(--fundo)] pb-16 pt-16 md:pb-24 md:pt-24"
    >
      {/* Grade técnica no lugar de brilho borrado. Um gradiente desfocado diz
          "bonito"; uma grade de 1px diz "instrumento". */}
      <div className="grade" aria-hidden="true" />

      <Container className="relative">
        <p className="etiqueta surgir">People Analytics &amp; BI</p>

        {/* Um dos três lugares onde o gradiente da marca aparece. O trecho
            destacado tem tamanho suficiente para o degradê existir: em corpo de
            14px ele some e sobra um borrão. */}
        <h1 className="surgir atraso-1 mt-5 max-w-[17ch] text-[36px] font-semibold leading-[1.05] text-[var(--texto)] md:text-[58px]">
          Dado de gente que vira <span className="texto-marca">decisão de negócio</span>.
        </h1>

        <p className="surgir atraso-2 mt-6 max-w-[62ch] text-base leading-relaxed text-[var(--texto-suave)] md:text-lg">
          {pitch.texto}
        </p>

        <div className="surgir atraso-3 mt-9 flex flex-wrap items-center gap-3">
          {pitch.acoes.map((a) => (
            <Botao key={a.alvo} href={a.alvo} tom={a.principal ? 'escuro' : 'claro'}>
              {a.rotulo}
              {a.principal && <ArrowRight size={15} />}
            </Botao>
          ))}
        </div>

        {/* Cada número vem com a frase que explica de onde ele saiu. Número sem
            procedência ao lado é só enfeite, e é a primeira coisa que um
            entrevistador pergunta. */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-[var(--borda)] bg-[var(--borda)] sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo} className="bg-[var(--superficie)] p-6">
              <dt className="text-[32px] font-semibold leading-none text-[var(--texto)]">
                {n.valor}
              </dt>
              <dd>
                <span className="mt-3 block text-[13px] font-medium leading-snug text-[var(--texto)]">
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
