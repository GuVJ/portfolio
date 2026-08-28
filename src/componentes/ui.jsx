// Primitivos visuais do FirstFinance (DESIGN_SYSTEM.md).
// Uma adaptacao consciente: o documento define container em max-w-[1600px],
// que serve para tela de aplicacao com sidebar. Este e um site de leitura
// corrida, entao o container fica em 1100px — largura em que a linha de texto
// nao passa de ~75 caracteres.

const SOMBRA_CARD = { boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }
const SOMBRA_HOVER = { boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)' }

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1100px] px-6 md:px-8 ${className}`}>{children}</div>
}

export function Secao({ id, rotulo, titulo, descricao, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
      <Container>
        {rotulo && (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
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
        <div className={rotulo || titulo ? 'mt-10' : ''}>{children}</div>
      </Container>
    </section>
  )
}

export function Card({ children, className = '', comHover = false, ...props }) {
  return (
    <div
      className={`rounded-[24px] border border-[#F5F5F5] bg-white transition-all duration-150 ${
        comHover ? 'hover:-translate-y-0.5' : ''
      } ${className}`}
      style={SOMBRA_CARD}
      onMouseEnter={comHover ? (e) => Object.assign(e.currentTarget.style, SOMBRA_HOVER) : undefined}
      onMouseLeave={comHover ? (e) => Object.assign(e.currentTarget.style, SOMBRA_CARD) : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export function Pill({ children, tom = 'neutro' }) {
  const tons = {
    neutro: 'bg-[#F1F5F9] text-[#6B7280]',
    info: 'bg-[#EAF1FF] text-[#2F6FED]',
    sucesso: 'bg-[#EAFBF1] text-[#16a34a]',
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
    info: 'bg-[#EAF1FF] text-[#2F6FED]',
    escuro: 'bg-slate-900 text-white',
    neutro: 'bg-[#F1F5F9] text-[#6B7280]',
    sucesso: 'bg-[#EAFBF1] text-[#16a34a]',
  }
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${tons[tom]}`}>
      {children}
    </div>
  )
}

export function BotaoEscuro({ children, href, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[24px] bg-slate-900 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-150 hover:bg-slate-800 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

export function BotaoClaro({ children, href, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[24px] border border-[#E5E5E5] bg-white px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#0F172A] transition-all duration-150 hover:bg-[#F1F5F9] ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
