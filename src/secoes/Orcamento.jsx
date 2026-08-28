import { useEffect, useRef, useState } from 'react'
import { Bot, RotateCcw, Send, Sparkles, Cpu, AlertTriangle, Check, MessageCircle, Mail } from 'lucide-react'
import { Secao, Card, Pill, CaixaIcone } from '../componentes/ui.jsx'
import { TIPOS, PERGUNTAS, ROTEIRO, AVISO } from '../dados/orcamento.js'
import { calcular, montarResumo, formatarBRL } from '../logica/estimativa.js'
import { perfil } from '../dados/perfil.js'

const ESPERA_DO_BOT = 380

export default function Orcamento() {
  const [mensagens, setMensagens] = useState([
    { de: 'bot', texto: ROTEIRO.saudacao },
    { de: 'bot', texto: ROTEIRO.comoFunciona },
    { de: 'bot', texto: ROTEIRO.primeiraPergunta },
  ])
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

    const calculado = calcular(respostas)
    const resumo = montarResumo(respostas, calculado, relato)

    // O valor já está calculado neste ponto. A chamada abaixo só busca o texto
    // que acompanha — se falhar, o orçamento aparece igual.
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
    setResultado({ ...calculado, resumo })
    setPensando(false)
    setEtapa({ tipo: 'fim' })
  }

  function recomecar() {
    setMensagens([
      { de: 'bot', texto: ROTEIRO.saudacao },
      { de: 'bot', texto: ROTEIRO.comoFunciona },
      { de: 'bot', texto: ROTEIRO.primeiraPergunta },
    ])
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
      id="orcamento"
      rotulo="Assistente de orçamento"
      titulo="Descubra a faixa de preço antes de marcar reunião."
      descricao="Cinco perguntas e você sai com valor, prazo e o resumo pronto para enviar. E sim — este assistente é ele próprio uma amostra do que eu construo: a conversa é de IA, mas o valor sai de um cálculo em código, auditável, que não muda de ideia entre uma pessoa e outra."
    >
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[#F5F5F5] px-6 py-4">
          <CaixaIcone tom="escuro">
            <Bot size={18} />
          </CaixaIcone>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#0F172A]">Assistente de orçamento</p>
            <p className="text-[13px] text-[#6B7280]">
              {resultado ? 'Estimativa pronta' : `${feitas} de ${totalEtapas} respondidas`}
            </p>
          </div>
          {(feitas > 0 || resultado) && (
            <button
              type="button"
              onClick={recomecar}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#F5F5F5] bg-white px-3.5 text-[13px] font-semibold text-[#0F172A] transition-all duration-150 hover:bg-[#F1F5F9]"
            >
              <RotateCcw size={14} /> Recomeçar
            </button>
          )}
        </div>

        <div className="h-1 w-full bg-[#F1F5F9]">
          <div
            className="h-full bg-[#2F6FED] transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-col gap-3" aria-live="polite">
            {mensagens.map((m, i) => (
              <div key={i} className={m.de === 'bot' ? 'flex' : 'flex justify-end'}>
                <p
                  className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-sm leading-relaxed ${
                    m.de === 'bot'
                      ? 'bg-[#F1F5F9] text-[#0F172A]'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {m.texto}
                </p>
              </div>
            ))}

            {pensando && (
              <div className="flex">
                <p className="rounded-[18px] bg-[#F1F5F9] px-4 py-3 text-sm text-[#6B7280]">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF]" />
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* --- escolhas --- */}
          {etapa.tipo === 'tipo' && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => escolher(t.rotulo, 'tipo', t.id)}
                  className="rounded-[16px] border border-[#F5F5F5] bg-white p-4 text-left transition-all duration-150 hover:border-[#DCE8FF] hover:bg-[#EAF1FF]"
                >
                  <span className="block text-sm font-semibold text-[#0F172A]">{t.rotulo}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-[#6B7280]">
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
                  className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F172A] transition-all duration-150 hover:border-[#2F6FED] hover:bg-[#EAF1FF] hover:text-[#255EDB]"
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
                className="w-full rounded-[16px] border border-[#F5F5F5] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-all duration-150 placeholder:text-[#9CA3AF] focus:border-[#2F6FED] focus:shadow-[0_0_0_3px_rgba(47,111,237,0.1)]"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#2F6FED] px-4 text-[13px] font-semibold text-white transition-all duration-150 hover:bg-[#255EDB]"
                >
                  <Send size={14} /> Ver a estimativa
                </button>
                <button
                  type="button"
                  onClick={() => fechar('')}
                  className="inline-flex h-10 items-center rounded-lg px-4 text-[13px] font-medium text-[#6B7280] transition-all duration-150 hover:bg-[#F1F5F9]"
                >
                  Pular
                </button>
              </div>
            </form>
          )}

          {/* --- resultado --- */}
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

  return (
    <div className="mt-6 rounded-[20px] border border-[#F5F5F5] bg-[#F8FAFC] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Estimativa preliminar
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

      <p className="mt-3 text-[28px] font-bold leading-none tracking-tight text-[#0F172A] md:text-[34px]">
        {formatarBRL(dados.piso)} <span className="text-[#6B7280]">a</span> {formatarBRL(dados.teto)}
      </p>
      <p className="mt-2 text-sm text-[#6B7280]">
        {dados.tipo.rotulo} · cerca de {dados.semanas} semana{dados.semanas > 1 ? 's' : ''}
        {dados.mensal > 0 && <> · suporte de {formatarBRL(dados.mensal)} por mês</>}
      </p>

      {comentario && (
        <p className="mt-4 border-l-2 border-[#DCE8FF] pl-4 text-sm leading-relaxed text-[#0F172A]">
          {comentario}
        </p>
      )}

      {dados.fase1 && (
        <div className="mt-5 rounded-[16px] border border-[#DCE8FF] bg-[#EAF1FF] p-4">
          <p className="text-[13px] font-semibold text-[#0F172A]">Sugestão: começar por uma fase 1</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#0F172A]">
            {formatarBRL(dados.fase1.piso)} a {formatarBRL(dados.fase1.teto)} em cerca de{' '}
            {dados.fase1.semanas} semanas, entregando primeiro a fatia que já gera decisão.
          </p>
        </div>
      )}

      {dados.alertas.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {dados.alertas.map((a) => (
            <li key={a} className="flex items-start gap-2.5">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[#B45309]" />
              <span className="text-[13px] leading-relaxed text-[#0F172A]">{a}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 border-t border-[#E5E5E5] pt-5">
        <p className="text-[13px] font-semibold text-[#0F172A]">O que entra na entrega</p>
        <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
          {dados.tipo.entrega.map((e) => (
            <li key={e} className="flex items-start gap-2">
              <Check size={15} className="mt-0.5 shrink-0 text-[#255EDB]" />
              <span className="text-[13px] leading-relaxed text-[#6B7280]">{e}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={zap}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-11 items-center gap-2 rounded-[24px] bg-slate-900 px-6 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-150 hover:bg-slate-800 active:scale-95"
        >
          <MessageCircle size={14} /> Mandar no WhatsApp
        </a>
        <a
          href={email}
          className="inline-flex h-11 items-center gap-2 rounded-[24px] border border-[#E5E5E5] bg-white px-6 text-xs font-semibold uppercase tracking-widest text-[#0F172A] transition-all duration-150 hover:bg-[#F1F5F9]"
        >
          <Mail size={14} /> Mandar por e-mail
        </a>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-[#6B7280]">{AVISO}</p>
    </div>
  )
}
