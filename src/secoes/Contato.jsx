import { Mail, Linkedin, Github, MessageCircle, MapPin } from 'lucide-react'
import { Secao, Card, Container, CaixaIcone } from '../componentes/ui.jsx'
import FormularioContato from '../componentes/FormularioContato.jsx'
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

        <div className="mt-6">
          <FormularioContato
            titulo="Ou me escreve por aqui"
            descricao="Chega direto no meu painel e eu respondo pelo canal que você preferir."
          />
        </div>
      </Secao>

      <footer className="border-t border-[#E5E5E5] py-10">
        <Container>
          <p className="text-sm font-semibold text-[#0F172A]">{perfil.nome}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-[#6B7280]">
            <MapPin size={13} /> {perfil.local}
          </p>
        </Container>
      </footer>
    </>
  )
}
