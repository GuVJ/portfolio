import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '../componentes/ui.jsx'

const LINKS = [
  { rotulo: 'Trajetória', alvo: '#trajetoria' },
  { rotulo: 'Projetos', alvo: '#projetos' },
  { rotulo: 'Serviços', alvo: '#servicos' },
  { rotulo: 'Stack', alvo: '#stack' },
]

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F9F9F9]/85 backdrop-blur-sm transition-all duration-150 ${
        rolou ? 'border-b border-[#E5E5E5]' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#topo" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-slate-900 text-[13px] font-bold text-white">
              G
            </span>
            <span className="text-sm font-semibold text-[#0F172A]">Gustavo Virgilio</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.alvo}
                href={l.alvo}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-[#6B7280] transition-all duration-150 hover:bg-[#F1F5F9] hover:text-[#0F172A]"
              >
                {l.rotulo}
              </a>
            ))}
            <a
              href="#contato"
              className="ml-2 inline-flex h-9 items-center rounded-lg bg-[#2F6FED] px-3.5 text-[13px] font-semibold text-white transition-all duration-150 hover:bg-[#255EDB]"
            >
              Falar comigo
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            className="flex h-10 w-10 items-center justify-center rounded-[16px] text-slate-500 transition-all duration-150 hover:bg-slate-50 hover:text-slate-600 md:hidden"
          >
            {aberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {aberto && (
          <nav className="flex flex-col gap-1 border-t border-[#F5F5F5] py-3 md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.alvo}
                href={l.alvo}
                onClick={() => setAberto(false)}
                className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#6B7280] transition-all duration-150 hover:bg-[#F1F5F9]"
              >
                {l.rotulo}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setAberto(false)}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-[#2F6FED] px-3.5 text-[13px] font-semibold text-white"
            >
              Falar comigo
            </a>
          </nav>
        )}
      </Container>
    </header>
  )
}
