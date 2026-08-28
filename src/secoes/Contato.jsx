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

export default function Contato() {
  return (
    <>
      <Secao
        id="contato"
        rotulo="Contato"
        titulo="Vaga CLT ou projeto PJ — os dois caminhos passam por aqui."
        descricao="Respondo rápido. Se for projeto, me manda o problema em duas linhas que eu já digo se dá para resolver e por onde eu começaria."
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
                <CaixaIcone tom={principal ? 'escuro' : 'neutro'}>
                  <Icone size={18} />
                </CaixaIcone>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#6B7280]">{rotulo}</p>
                  <p className="truncate text-sm font-semibold text-[#0F172A]">{valor}</p>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </Secao>

      <footer className="border-t border-[#E5E5E5] py-10">
        <Container>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">{perfil.nome}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                <MapPin size={13} /> {perfil.local}
              </p>
            </div>
            <p className="text-[13px] text-[#6B7280]">
              Feito em React e Tailwind. Código em{' '}
              <a
                href={perfil.github}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-[#6B7280] underline underline-offset-2 transition-all duration-150 hover:text-[#2F6FED]"
              >
                github.com/GuVJ
              </a>
              .
            </p>
          </div>
        </Container>
      </footer>
    </>
  )
}
