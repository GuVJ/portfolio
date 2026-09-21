import { Secao, Card, Pill } from '../componentes/ui.jsx'
import { trajetoria } from '../dados/perfil.js'

// Os quatro logos somam 13 kB, entao nao levam `loading="lazy"`. Lazy loading
// existe para imagem pesada; aqui ele nao economiza nada e ainda adiciona um
// modo de falha, porque depende do observador de intersecao disparar. Se ele
// nao dispara, o visitante ve quatro selos brancos vazios.
//
// O selo fica claro em todas as empresas, e nao so nas que precisam.
//
// O logo da Dock e preto e sumiria no fundo #06070a; o do Santander e vermelho
// sobre branco. Dar a cada um a sua propria base resolve os dois casos de uma
// vez e, principalmente, faz os cinco lerem como uma familia em vez de cinco
// tratamentos diferentes. E o que o LinkedIn faz, pelo mesmo motivo.
function Selo({ empresa, logo }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[var(--texto)]">
      {logo ? (
        <img
          src={logo}
          alt={empresa}
          width={28}
          height={28}
          decoding="async"
          className="h-7 w-7 object-contain"
        />
      ) : (
        // Sem arquivo oficial, o monograma. Desenhar uma aproximacao da marca
        // de outra empresa seria pior que nao ter logo nenhum.
        <span aria-hidden="true" className="text-[15px] font-semibold text-[var(--fundo)]">
          {empresa.charAt(0)}
        </span>
      )}
    </span>
  )
}

export default function Trajetoria({ tom }) {
  return (
    <Secao tom={tom} id="trajetoria" rotulo="Trajetória" titulo="Sete anos, cinco operações.">
      <div className="space-y-4">
        {trajetoria.map((exp) => (
          <Card key={exp.empresa + exp.periodo} className="p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="flex min-w-0 items-start gap-4">
                <Selo empresa={exp.empresa} logo={exp.logo} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold text-[var(--texto)]">{exp.empresa}</h3>
                    {exp.atual && <Pill tom="info">Atual</Pill>}
                  </div>
                  <p className="mt-1 text-sm font-medium text-[var(--acento)]">{exp.cargo}</p>
                </div>
              </div>
              <p className="shrink-0 text-[13px] font-medium text-[var(--texto-suave)] md:text-right">
                {exp.periodo}
              </p>
            </div>

            <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-[var(--texto-suave)]">
              {exp.resumo}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.stack.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Secao>
  )
}
