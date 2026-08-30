import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '../componentes/ui.jsx'

const LINKS = [
  { rotulo: 'Cases', alvo: '#cases' },
  { rotulo: 'Trajetória', alvo: '#trajetoria' },
  { rotulo: 'Projetos', alvo: '#projetos' },
  { rotulo: 'Serviços', alvo: '#servicos' },
  { rotulo: 'Orçamento', alvo: '#orcamento' },
  { rotulo: 'Stack', alvo: '#stack' },
]

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false)


  return (
    <header
      className="tema-escuro border-b border-[var(--borda)] bg-[var(--fundo)]"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#topo" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--texto)] text-[13px] font-bold text-[var(--fundo)]">
              G
            </span>
            <span className="text-sm font-semibold text-[var(--texto)]">Gustavo Virgilio</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.alvo}
                href={l.alvo}
                className="rounded-lg px-3 py-2 text-[13px] font-medium text-[var(--texto-suave)] transition-all duration-150 hover:bg-[var(--pilula-fundo)] hover:text-[var(--texto)]"
              >
                {l.rotulo}
              </a>
            ))}
            <a
              href="#contato"
              className="ml-2 inline-flex h-9 items-center rounded-lg bg-[var(--acento)] px-3.5 text-[13px] font-semibold text-[var(--fundo)] transition-all duration-150 hover:opacity-90"
            >
              Falar comigo
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
            className="flex h-10 w-10 items-center justify-center rounded-[16px] text-[var(--rotulo)] transition-all duration-150 hover:bg-[var(--pilula-fundo)] hover:text-[var(--texto)] md:hidden"
          >
            {aberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {aberto && (
          <nav className="flex flex-col gap-1 border-t border-[var(--borda)] py-3 md:hidden">
            {LINKS.map((l) => (
              <a
                key={l.alvo}
                href={l.alvo}
                onClick={() => setAberto(false)}
                className="rounded-lg px-3 py-2.5 text-[13px] font-medium text-[var(--texto-suave)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
              >
                {l.rotulo}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setAberto(false)}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-[var(--acento)] px-3.5 text-[13px] font-semibold text-[var(--fundo)]"
            >
              Falar comigo
            </a>
          </nav>
        )}
      </Container>
    </header>
  )
}
