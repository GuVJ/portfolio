// Primitivos visuais do FirstFinance (DESIGN_SYSTEM.md).
//
// Uma adaptacao consciente: o documento define container em max-w-[1600px],
// que serve para tela de aplicacao com sidebar. Este e um site de leitura
// corrida, entao o container fica em 1100px — largura em que a linha de texto
// nao passa de ~75 caracteres.
//
// REGRA DESTE ARQUIVO: cor de fundo e cor de texto saem sempre de uma variante
// (`tom`), nunca de `className`. Passar `bg-slate-900` por className num
// componente que ja tem `bg-white` na base nao funciona — as duas utilidades
// tem a mesma especificidade e quem vence e a que o Tailwind gera por ultimo
// no CSS, que e `bg-white`. Foi assim que o CTA escuro nasceu branco com texto
// branco em cima. `className` aqui e para espacamento e layout.

const SOMBRA_CARD = { boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }
const SOMBRA_HOVER = { boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)' }
const SOMBRA_ESCURA = { boxShadow: '0 12px 32px rgba(15, 23, 42, 0.18)' }

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1100px] px-6 md:px-8 ${className}`}>{children}</div>
}

export function Secao({ id, rotulo, titulo, descricao, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-10 md:py-14 ${className}`}>
      <Container>
        {rotulo && (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            {rotulo}
          </p>
        )}
        {titulo && (
          <h2 className="max-w-[24ch] text-2xl font-bold leading-tight text-[#0F172A] md:text-[32px]">
            {titulo}
          </h2>
        )}
        {descricao && (
          <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-[#6B7280] md:text-base">
            {descricao}
          </p>
        )}
        <div className={rotulo || titulo ? 'mt-8' : ''}>{children}</div>
      </Container>
    </section>
  )
}

const TONS_CARD = {
  claro: 'border-[#F5F5F5] bg-white',
  escuro: 'border-slate-800 bg-slate-900',
}

export function Card({ children, className = '', tom = 'claro', comHover = false, ...props }) {
  const escuro = tom === 'escuro'
  const repouso = escuro ? SOMBRA_ESCURA : SOMBRA_CARD

  return (
    <div
      className={`rounded-[24px] border transition-all duration-150 ${TONS_CARD[tom]} ${
        comHover ? 'hover:-translate-y-0.5' : ''
      } ${className}`}
      style={repouso}
      onMouseEnter={
        comHover && !escuro ? (e) => Object.assign(e.currentTarget.style, SOMBRA_HOVER) : undefined
      }
      onMouseLeave={
        comHover && !escuro ? (e) => Object.assign(e.currentTarget.style, repouso) : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}

export function Pill({ children, tom = 'neutro' }) {
  const tons = {
    neutro: 'bg-[#F1F5F9] text-[#4B5563]',
    info: 'bg-[#EAF1FF] text-[#255EDB]',
    sucesso: 'bg-[#EAFBF1] text-[#15803D]',
    escuro: 'bg-slate-900 text-white',
  }
  return (
    <span
      className={`inline-flex h-[22px] items-center rounded-full px-2.5 text-[12px] font-medium ${tons[tom]}`}
    >
      {children}
    </span>
  )
}

export function CaixaIcone({ children, tom = 'info' }) {
  const tons = {
    info: 'bg-[#EAF1FF] text-[#255EDB]',
    escuro: 'bg-slate-900 text-white',
    neutro: 'bg-[#F1F5F9] text-[#4B5563]',
    sucesso: 'bg-[#EAFBF1] text-[#15803D]',
  }
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${tons[tom]}`}>
      {children}
    </div>
  )
}

const TONS_BOTAO = {
  // CTA escuro do design system: slate-900, maiuscula, tracking largo.
  escuro: 'bg-slate-900 text-white hover:bg-slate-800 border border-transparent',
  // Secundario sobre fundo claro.
  claro: 'bg-white text-[#0F172A] border border-[#E5E5E5] hover:bg-[#F1F5F9]',
  // Para usar DENTRO de um card escuro: inverte, branco com texto slate-900.
  branco: 'bg-white text-slate-900 border border-transparent hover:bg-slate-100',
}

export function Botao({ children, href, tom = 'escuro', className = '', ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[24px] px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-150 active:scale-95 ${TONS_BOTAO[tom]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

// Mantidos como atalhos de leitura; ambos delegam para Botao.
export function BotaoEscuro(props) {
  return <Botao tom="escuro" {...props} />
}

export function BotaoClaro(props) {
  return <Botao tom="claro" {...props} />
}
