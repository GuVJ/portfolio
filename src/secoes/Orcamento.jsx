import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  RotateCcw,
  Send,
  Sparkles,
  Cpu,
  AlertTriangle,
  Check,
  MessageCircle,
  Mail,
  CalendarClock,
} from 'lucide-react'
import { Secao, Card, Pill, CaixaIcone } from '../componentes/ui.jsx'
import { TIPOS, PERGUNTAS, ROTEIRO, AVISO } from '../dados/orcamento.js'
import { calcularEscopo, montarResumo } from '../logica/escopo.js'
import FormularioContato from '../componentes/FormularioContato.jsx'
import { perfil } from '../dados/perfil.js'

const ESPERA_DO_BOT = 380

const ABERTURA = [
  { de: 'bot', texto: ROTEIRO.saudacao },
  { de: 'bot', texto: ROTEIRO.comoFunciona },
  { de: 'bot', texto: ROTEIRO.primeiraPergunta },
]

export default function Orcamento({ tom }) {
  const [mensagens, setMensagens] = useState(ABERTURA)
  const [etapa, setEtapa] = useState({ tipo: 'tipo' })
  const [respostas, setRespostas] = useState({})
  const [textoLivre, setTextoLivre] = useState('')
  const [resultado, setResultado] = useState(null)
  const [comentario, setComentario] = useState(null)
  const [fonteDoTexto, setFonteDoTexto] = useState(null)
  const [pensando, setPensando] = useState(false)

  const fim = useRef(null)
  const jaInteragiu = useRef(false)

  // Rola só depois da primeira escolha — senão a página pula sozinha assim que
  // a seção entra na tela.
  useEffect(() => {
    if (jaInteragiu.current) fim.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [mensagens, resultado])

  function falar(textos) {
    const lista = Array.isArray(textos) ? textos : [textos]
    setMensagens((m) => [...m, ...lista.map((t) => ({ de: 'bot', texto: t }))])
  }

  function avancar(respostasNovas) {
    const respondidas = PERGUNTAS.filter((p) => respostasNovas[p.id])
    const proxima = PERGUNTAS[respondidas.length]

    if (proxima) {
      falar([proxima.pergunta, proxima.ajuda])
      setEtapa({ tipo: 'pergunta', indice: respondidas.length })
      return
    }

    falar(ROTEIRO.pedidoDeTexto)
    setEtapa({ tipo: 'texto' })
  }

  function escolher(rotulo, chave, valor) {
    jaInteragiu.current = true
    const novas = { ...respostas, [chave]: valor }
    setRespostas(novas)
    setMensagens((m) => [...m, { de: 'pessoa', texto: rotulo }])
    setEtapa({ tipo: 'esperando' })
    setPensando(true)
    setTimeout(() => {
      setPensando(false)
      avancar(novas)
    }, ESPERA_DO_BOT)
  }

  async function fechar(relato) {
    jaInteragiu.current = true
    if (relato.trim()) setMensagens((m) => [...m, { de: 'pessoa', texto: relato.trim() }])
    setEtapa({ tipo: 'esperando' })
    setPensando(true)

    const escopo = calcularEscopo(respostas)
    const resumo = montarResumo(respostas, escopo, relato)

    // O escopo já está pronto neste ponto. A chamada abaixo só busca o texto que
    // acompanha — se falhar, o resultado aparece igual.
    let texto = null
    try {
      const r = await fetch('/api/orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumo, textoLivre: relato }),
      })
      if (r.ok) texto = (await r.json()).texto
    } catch {
      texto = null
    }

    setComentario(texto || ROTEIRO.encerramento)
    setFonteDoTexto(texto ? 'gemini' : 'local')
    setResultado({ ...escopo, resumo, respostas })
    setPensando(false)
    setEtapa({ tipo: 'fim' })
  }

  function recomecar() {
    setMensagens(ABERTURA)
    setEtapa({ tipo: 'tipo' })
    setRespostas({})
    setTextoLivre('')
    setResultado(null)
    setComentario(null)
    setFonteDoTexto(null)
  }

  const totalEtapas = PERGUNTAS.length + 1
  const feitas = Object.keys(respostas).length
  const progresso = resultado ? 100 : Math.round((feitas / totalEtapas) * 100)

  return (
    <Secao
      tom={tom}
      id="orcamento"
      rotulo="Assistente de projeto"
      titulo="Escopo e prazo antes da reunião."
      descricao="Cinco perguntas. A conversa é de IA, o cálculo é em código."
    >
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[var(--borda)] px-6 py-4">
          <CaixaIcone tom="contraste">
            <Bot size={18} />
          </CaixaIcone>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[var(--texto)]">Assistente de projeto</p>
            <p className="text-[13px] text-[var(--texto-suave)]">
              {resultado ? 'Escopo pronto' : `${feitas} de ${totalEtapas} respondidas`}
            </p>
          </div>
          {(feitas > 0 || resultado) && (
            <button
              type="button"
              onClick={recomecar}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--borda)] bg-[var(--superficie)] px-3.5 text-[13px] font-semibold text-[var(--texto)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
            >
              <RotateCcw size={14} /> Recomeçar
            </button>
          )}
        </div>

        <div className="h-1 w-full bg-[var(--pilula-fundo)]">
          <div
            className="h-full bg-[var(--acento)] transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-col gap-3" aria-live="polite">
            {mensagens.map((m, i) => (
              <div key={i} className={m.de === 'bot' ? 'flex' : 'flex justify-end'}>
                <p
                  className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-sm leading-relaxed ${
                    m.de === 'bot' ? 'bg-[var(--pilula-fundo)] text-[var(--texto)]' : 'bg-[var(--texto)] text-[var(--fundo)]'
                  }`}
                >
                  {m.texto}
                </p>
              </div>
            ))}

            {pensando && (
              <div className="flex">
                <p className="rounded-[18px] bg-[var(--pilula-fundo)] px-4 py-3 text-sm text-[var(--texto-suave)]">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--texto-suave)] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--texto-suave)] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--texto-suave)]" />
                  </span>
                </p>
              </div>
            )}
          </div>

          {etapa.tipo === 'tipo' && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => escolher(t.rotulo, 'tipo', t.id)}
                  className="rounded-[16px] border border-[var(--borda)] bg-[var(--superficie)] p-4 text-left transition-all duration-150 hover:border-[var(--acento-borda)] hover:bg-[var(--acento-fundo)]"
                >
                  <span className="block text-sm font-semibold text-[var(--texto)]">{t.rotulo}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-[var(--texto-suave)]">
                    {t.descricao}
                  </span>
                </button>
              ))}
            </div>
          )}

          {etapa.tipo === 'pergunta' && (
            <div className="mt-6 flex flex-wrap gap-2">
              {PERGUNTAS[etapa.indice].opcoes.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => escolher(o.rotulo, PERGUNTAS[etapa.indice].id, o.id)}
                  className="rounded-full border border-[var(--borda-forte)] bg-[var(--superficie)] px-4 py-2.5 text-[13px] font-semibold text-[var(--texto)] transition-all duration-150 hover:border-[var(--acento)] hover:bg-[var(--acento-fundo)] hover:text-[var(--acento)]"
                >
                  {o.rotulo}
                </button>
              ))}
            </div>
          )}

          {etapa.tipo === 'texto' && (
            <form
              className="mt-6 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                fechar(textoLivre)
              }}
            >
              <label htmlFor="relato" className="sr-only">
                O que trava hoje
              </label>
              <textarea
                id="relato"
                rows={3}
                value={textoLivre}
                onChange={(e) => setTextoLivre(e.target.value)}
                maxLength={800}
                placeholder="Ex.: a aprovação roda por e-mail e ninguém sabe onde parou."
                className="w-full rounded-[16px] border border-[var(--borda)] bg-[var(--superficie)] px-4 py-3 text-sm text-[var(--texto)] outline-none transition-all duration-150 placeholder:text-[var(--texto-suave)] focus:border-[var(--acento)] focus:shadow-[0_0_0_3px_rgba(47,111,237,0.1)]"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[var(--acento)] px-4 text-[13px] font-semibold text-[var(--fundo)] transition-all duration-150 hover:opacity-90"
                >
                  <Send size={14} /> Ver o escopo
                </button>
                <button
                  type="button"
                  onClick={() => fechar('')}
                  className="inline-flex h-10 items-center rounded-lg px-4 text-[13px] font-medium text-[var(--texto-suave)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
                >
                  Pular
                </button>
              </div>
            </form>
          )}

          {resultado && <Resultado dados={resultado} comentario={comentario} fonte={fonteDoTexto} />}

          <div ref={fim} />
        </div>
      </Card>
    </Secao>
  )
}

function Resultado({ dados, comentario, fonte }) {
  const assunto = encodeURIComponent(`Projeto: ${dados.tipo.rotulo}`)
  const corpo = encodeURIComponent(`Oi Gustavo, vim pelo site.\n\n${dados.resumo}`)
  const zap = `https://wa.me/${perfil.telefoneNumerico}?text=${corpo}`
  const email = `mailto:${perfil.email}?subject=${assunto}&body=${corpo}`

  const escolhas = PERGUNTAS.map((p) => {
    const o = p.opcoes.find((x) => x.id === dados.respostas[p.id])
    return o ? o.rotulo : null
  }).filter(Boolean)

  return (
    <div className="mt-6 rounded-[20px] border border-[var(--borda)] bg-[var(--superficie-2)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--rotulo)]">
          Escopo entendido
        </p>
        <Pill tom={fonte === 'gemini' ? 'info' : 'neutro'}>
          {fonte === 'gemini' ? (
            <span className="inline-flex items-center gap-1">
              <Sparkles size={11} /> Texto por IA
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Cpu size={11} /> Motor local
            </span>
          )}
        </Pill>
      </div>

      <h3 className="mt-3 text-xl font-semibold text-[var(--texto)] md:text-2xl">{dados.tipo.rotulo}</h3>

      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--acento-fundo)] px-3.5 py-2 text-sm font-semibold text-[var(--acento)]">
        <CalendarClock size={15} />
        Cerca de {dados.semanas} semana{dados.semanas > 1 ? 's' : ''}
        {dados.temSuporte && <span className="font-medium">· com suporte mensal</span>}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {escolhas.map((e) => (
          <Pill key={e}>{e}</Pill>
        ))}
      </div>

      {comentario && (
        <p className="mt-5 border-l-2 border-[var(--acento-borda)] pl-4 text-sm leading-relaxed text-[var(--texto)]">
          {comentario}
        </p>
      )}

      {dados.fase1 && (
        <div className="mt-5 rounded-[16px] border border-[var(--acento-borda)] bg-[var(--acento-fundo)] p-4">
          <p className="text-[13px] font-semibold text-[var(--texto)]">Sugestão: começar por uma fase 1</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--texto)]">
            Cerca de {dados.fase1.semanas} semanas, entregando primeiro a fatia que já gera decisão.
            O resto vira etapa 2, com o aprendizado da primeira.
          </p>
        </div>
      )}

      {dados.alertas.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {dados.alertas.map((a) => (
            <li key={a} className="flex items-start gap-2.5">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[var(--acento)]" />
              <span className="text-[13px] leading-relaxed text-[var(--texto)]">{a}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-[var(--borda-forte)] pt-5">
        <p className="text-[13px] font-semibold text-[var(--texto)]">O que entra na entrega</p>
        <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {dados.tipo.entrega.map((e) => (
            <li key={e} className="flex items-start gap-2">
              <Check size={15} className="mt-0.5 shrink-0 text-[var(--acento)]" />
              <span className="text-[13px] leading-relaxed text-[var(--texto-suave)]">{e}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={zap}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-11 items-center gap-2 rounded-[24px] bg-[var(--texto)] px-6 text-xs font-semibold uppercase tracking-widest text-[var(--fundo)] transition-all duration-150 hover:opacity-90 active:scale-95"
        >
          <MessageCircle size={14} /> Receber a proposta
        </a>
        <a
          href={email}
          className="inline-flex h-11 items-center gap-2 rounded-[24px] border border-[var(--borda-forte)] bg-[var(--superficie)] px-6 text-xs font-semibold uppercase tracking-widest text-[var(--texto)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
        >
          <Mail size={14} /> Mandar por e-mail
        </a>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-[var(--texto-suave)]">{AVISO}</p>

      {/* Os dois botoes acima abrem o app de mensagem e dependem da pessoa
          enviar. Aqui ela deixa o contato e quem corre atras sou eu. O escopo
          vai junto — sem valor, pela mesma razao do resumo: numero de preco
          nao sai daqui. */}
      <div className="mt-6">
        <FormularioContato
          orcamento={{
            tipo: dados.tipo.rotulo,
            semanas: dados.semanas,
            horas: dados.horas,
            resumo: dados.resumo,
          }}
          titulo="Prefere que eu te procure?"
          descricao="Deixa o contato que eu mando a proposta fechada com esse escopo."
        />
      </div>
    </div>
  )
}
