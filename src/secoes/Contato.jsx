import { Mail, Linkedin, Github, MessageCircle, MapPin } from 'lucide-react'
import { Secao, Card, Container, CaixaIcone } from '../componentes/ui.jsx'
import { perfil } from '../dados/perfil.js'

const CANAIS = [
  {
    rotulo: 'E-mail',
    valor: perfil.email,
    href: `mailto:${perfil.email}`,
    Icone: Mail,
    principal: true,
  },
  {
    rotulo: 'WhatsApp',
    valor: perfil.telefone,
    href: `https://wa.me/${perfil.telefoneNumerico}`,
    Icone: MessageCircle,
  },
  {
    rotulo: 'LinkedIn',
    valor: '/in/gustavo-virgilio-joaquim',
    href: perfil.linkedin,
    Icone: Linkedin,
  },
  {
    rotulo: 'GitHub',
    valor: '/GuVJ',
    href: perfil.github,
    Icone: Github,
  },
]

export default function Contato({ tom }) {
  return (
    <>
      <Secao
      tom={tom}
        id="contato"
        rotulo="Contato"
        titulo="Vaga CLT ou projeto PJ."
        descricao="Se for projeto, manda o problema em duas linhas."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {CANAIS.map(({ rotulo, valor, href, Icone, principal }) => (
            <Card key={rotulo} className="p-0" comHover>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="flex items-center gap-4 p-6"
              >
                <CaixaIcone tom={principal ? 'contraste' : 'neutro'}>
                  <Icone size={18} />
                </CaixaIcone>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[var(--texto-suave)]">{rotulo}</p>
                  <p className="truncate text-sm font-semibold text-[var(--texto)]">{valor}</p>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </Secao>

      <footer className="tema-escuro border-t border-[var(--borda-forte)] bg-[var(--fundo)] py-10">
        <Container>
          <p className="text-sm font-semibold text-[var(--texto)]">{perfil.nome}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-[var(--texto-suave)]">
            <MapPin size={13} /> {perfil.local}
          </p>
        </Container>
      </footer>
    </>
  )
}
