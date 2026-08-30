// Primitivos visuais do FirstFinance (DESIGN_SYSTEM.md).
//
// Adaptacoes conscientes, todas documentadas no README:
// 1. Tailwind entra no build, nao por CDN.
// 2. Container em 1100px, nao 1600px — site de leitura, nao tela de app.
// 3. Alguns tons apagados do documento foram escurecidos para passar no WCAG AA.
// 4. O documento e light-only; aqui as secoes alternam claro e escuro.
//
// REGRA DESTE ARQUIVO: cor sai de token (`var(--...)`) ou de variante (`tom`),
// nunca de `className`. Passar `bg-slate-900` por className num componente que
// ja tem `bg-white` na base nao funciona — as duas utilidades tem a mesma
// especificidade e vence a que o Tailwind gera por ultimo no CSS. Foi assim que
// o CTA escuro nasceu branco com texto branco em cima.
//
// Os tokens vivem em `src/index.css`, nas classes `.tema-claro` e
// `.tema-escuro`. Cada secao aplica uma das duas e tudo dentro dela se adapta.

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1100px] px-6 md:px-8 ${className}`}>{children}</div>
}

export function Secao({ id, rotulo, titulo, descricao, children, tom = 'claro', className = '' }) {
  return (
    <section
      id={id}
      className={`tema-${tom} scroll-mt-4 bg-[var(--fundo)] py-12 md:py-16 ${className}`}
    >
      <Container>
        {rotulo && (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--rotulo)]">
            {rotulo}
          </p>
        )}
        {titulo && (
          <h2 className="max-w-[24ch] text-2xl font-bold leading-tight text-[var(--texto)] md:text-[32px]">
            {titulo}
          </h2>
        )}
        {descricao && (
          <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-[var(--texto-suave)] md:text-base">
            {descricao}
          </p>
        )}
        <div className={rotulo || titulo ? 'mt-8' : ''}>{children}</div>
      </Container>
    </section>
  )
}

export function Card({ children, className = '', tom = 'superficie', comHover = false, ...props }) {
  // `superficie` acompanha o tema da secao. `contraste` e o cartao de destaque,
  // que inverte em relacao ao fundo em que estiver — escuro no claro, claro no
  // escuro — sem precisar saber qual dos dois e.
  const contraste = tom === 'contraste'
  const pintura = contraste
    ? 'border-[var(--texto)] bg-[var(--texto)]'
    : 'border-[var(--borda)] bg-[var(--superficie)]'

  return (
    <div
      className={`rounded-[24px] border transition-all duration-150 ${pintura} ${
        comHover ? 'hover:-translate-y-0.5' : ''
      } ${className}`}
      style={{ boxShadow: contraste ? 'var(--sombra-alta)' : 'var(--sombra)' }}
      onMouseEnter={
        comHover && !contraste
          ? (e) => (e.currentTarget.style.boxShadow = 'var(--sombra-alta)')
          : undefined
      }
      onMouseLeave={
        comHover && !contraste
          ? (e) => (e.currentTarget.style.boxShadow = 'var(--sombra)')
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  )
}

export function Pill({ children, tom = 'neutro' }) {
  const tons = {
    neutro: 'bg-[var(--pilula-fundo)] text-[var(--pilula-texto)]',
    info: 'bg-[var(--acento-fundo)] text-[var(--acento)]',
    sucesso: 'bg-[var(--acento-fundo)] text-[var(--acento)]',
    contraste: 'bg-[var(--texto)] text-[var(--fundo)]',
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
    info: 'bg-[var(--acento-fundo)] text-[var(--acento)]',
    contraste: 'bg-[var(--texto)] text-[var(--fundo)]',
    neutro: 'bg-[var(--pilula-fundo)] text-[var(--pilula-texto)]',
    sucesso: 'bg-[var(--acento-fundo)] text-[var(--acento)]',
  }
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${tons[tom]}`}>
      {children}
    </div>
  )
}

const TONS_BOTAO = {
  // CTA principal: inverte em relacao ao fundo. Em secao clara sai o slate-900
  // do design system; em secao escura sai claro, como o FirstSites faz.
  escuro: 'bg-[var(--texto)] text-[var(--fundo)] border border-transparent hover:opacity-90',
  claro:
    'bg-[var(--superficie)] text-[var(--texto)] border border-[var(--borda-forte)] hover:bg-[var(--pilula-fundo)]',
  // Para usar DENTRO de um cartao de contraste, onde o fundo ja esta invertido.
  branco: 'bg-[var(--fundo)] text-[var(--texto)] border border-transparent hover:opacity-90',
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
