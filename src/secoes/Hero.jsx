import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Container, BotaoEscuro, BotaoClaro } from '../componentes/ui.jsx'
import { pitch, numeros } from '../dados/perfil.js'

export default function Hero() {
  const [modo, setModo] = useState('clt')
  const atual = pitch[modo]

  return (
    <section id="topo" className="pb-10 pt-10 md:pb-14 md:pt-16">
      <Container>
        <h1 className="max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#0F172A] md:text-[54px]">
          {atual.titulo}
        </h1>

        {/* Alternador de publico: a mesma trajetoria contada para quem contrata
            CLT e para quem contrata projeto fechado. */}
        <div
          role="tablist"
          aria-label="Escolha o tipo de contratação"
          className="mt-8 inline-flex rounded-[24px] border border-[#F5F5F5] bg-white p-1"
          style={{ boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}
        >
          {Object.entries(pitch).map(([chave, dados]) => {
            const ativo = modo === chave
            return (
              <button
                key={chave}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setModo(chave)}
                className={`rounded-[20px] px-5 py-2.5 text-[13px] font-semibold transition-all duration-150 ${
                  ativo
                    ? 'bg-slate-900 text-white'
                    : 'bg-transparent text-[#6B7280] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                {dados.rotulo}
              </button>
            )
          })}
        </div>

        <p className="mt-6 max-w-[64ch] text-base leading-relaxed text-[#6B7280] md:text-lg">
          {atual.texto}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <BotaoEscuro href={atual.ctaAlvo}>
            {atual.cta} <ArrowRight size={14} />
          </BotaoEscuro>
          <BotaoClaro href="#contato">
            <Mail size={14} /> Entrar em contato
          </BotaoClaro>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#E5E5E5] pt-8 md:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <dt className="text-[28px] font-bold leading-none tracking-tight text-[#0F172A] md:text-[32px]">
                {n.valor}
              </dt>
              <dd className="mt-2 text-[13px] font-medium leading-snug text-[#6B7280]">{n.rotulo}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
