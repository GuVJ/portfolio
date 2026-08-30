// Formulario curto que manda o contato para o CRM.
//
// Duas decisoes que valem explicar:
// 1. Consentimento e checkbox DESMARCADO, com texto claro. Sem ele o CRM
//    recusa com 400 — a regra vive nos dois lados de proposito.
// 2. Se o envio falhar, a tela nao vira um beco: ela mostra WhatsApp e
//    e-mail, que funcionam sem depender de nada meu estar de pe.

import { useState } from 'react'
import { Check, Send, AlertTriangle, MessageCircle, Mail } from 'lucide-react'
import { mandarParaRadar } from '../logica/radar.js'
import { perfil } from '../dados/perfil.js'

const CAMPO =
  'h-11 w-full rounded-[14px] border border-[var(--borda-forte)] bg-[var(--superficie)] px-4 text-sm text-[var(--texto)] outline-none transition-all duration-150 placeholder:text-[var(--texto-suave)] focus:border-[var(--acento)] focus:shadow-[0_0_0_3px_rgba(47,111,237,0.1)]'
const ROTULO = 'mb-1.5 block text-[13px] font-medium text-[var(--texto-suave)]'

export default function FormularioContato({ orcamento = null, titulo, descricao }) {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', empresa: '', mensagem: '', website: '',
  })
  const [aceito, setAceito] = useState(false)
  const [estado, setEstado] = useState({ fase: 'parado' })

  const campo = (k) => ({
    value: form[k],
    onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })),
  })

  async function enviar(e) {
    e.preventDefault()
    setEstado({ fase: 'enviando' })
    try {
      const r = await mandarParaRadar({
        ...form,
        consentimento: aceito,
        origem_detalhe: orcamento ? 'assistente-orcamento' : 'secao-contato',
        servico: orcamento?.tipo || null,
        orcamento: orcamento
          ? { valor: orcamento.valor, semanas: orcamento.semanas, resumo: orcamento.resumo }
          : null,
        valor_estimado: orcamento?.valor ?? null,
        prazo_semanas: orcamento?.semanas ?? null,
      })
      setEstado({ fase: 'pronto', retorno: r.retorno_em })
    } catch (err) {
      setEstado({ fase: 'erro', mensagem: err.message })
    }
  }

  if (estado.fase === 'pronto') {
    return (
      <div className="rounded-[20px] border border-[var(--acento-borda)] bg-[var(--acento-fundo)] p-6">
        <div className="flex items-start gap-3">
          <Check size={18} className="mt-0.5 shrink-0 text-[var(--acento)]" />
          <div>
            <p className="text-sm font-semibold text-[var(--texto)]">Recebido. Obrigado!</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--texto)]">
              Retorno em {estado.retorno || 'até 2 dias úteis'}. Se for urgente, me chama direto
              no WhatsApp que eu vejo na hora.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="rounded-[20px] border border-[var(--borda)] bg-[var(--superficie-2)] p-6">
      {titulo && <p className="text-base font-semibold text-[var(--texto)]">{titulo}</p>}
      {descricao && <p className="mt-1 text-[13px] leading-relaxed text-[var(--texto-suave)]">{descricao}</p>}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={ROTULO} htmlFor="lead-nome">Nome *</label>
          <input id="lead-nome" className={CAMPO} required placeholder="Como te chamo" {...campo('nome')} />
        </div>
        <div>
          <label className={ROTULO} htmlFor="lead-empresa">Empresa</label>
          <input id="lead-empresa" className={CAMPO} placeholder="Onde você trabalha" {...campo('empresa')} />
        </div>
        <div>
          <label className={ROTULO} htmlFor="lead-email">E-mail *</label>
          <input id="lead-email" className={CAMPO} type="email" required placeholder="voce@empresa.com.br" {...campo('email')} />
        </div>
        <div>
          <label className={ROTULO} htmlFor="lead-telefone">WhatsApp</label>
          <input id="lead-telefone" className={CAMPO} placeholder="(11) 9…" {...campo('telefone')} />
        </div>
      </div>

      <div className="mt-4">
        <label className={ROTULO} htmlFor="lead-mensagem">
          {orcamento ? 'Quer acrescentar algo?' : 'O problema em duas linhas'}
        </label>
        <textarea
          id="lead-mensagem"
          rows={3}
          className={`${CAMPO} h-auto py-3`}
          placeholder={orcamento ? 'Opcional' : 'Ex.: tenho os dados de venda em planilha e preciso enxergar o que gira'}
          {...campo('mensagem')}
        />
      </div>

      {/* Armadilha para robô: fica fora da tela e gente nunca preenche. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...campo('website')}
      />

      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={aceito}
          onChange={(e) => setAceito(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#2F6FED]"
        />
        <span className="text-[13px] leading-relaxed text-[var(--texto-suave)]">
          Autorizo o Gustavo a guardar esses dados para me responder sobre este contato. Não vira
          lista de e-mail, e é só pedir que eu apago.
        </span>
      </label>

      {estado.fase === 'erro' && (
        <div className="mt-4 rounded-[14px] border border-[var(--borda-forte)] bg-[var(--pilula-fundo)] p-4">
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--texto)]">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-[var(--texto)]" />
            Não consegui enviar ({estado.mensagem}). Me chama por um destes que funciona igual:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={`https://wa.me/${perfil.telefoneNumerico}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center gap-2 rounded-[20px] bg-[var(--texto)] px-5 text-xs font-semibold uppercase tracking-widest text-[var(--fundo)] transition-all duration-150 hover:opacity-90"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href={`mailto:${perfil.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-[20px] border border-[var(--borda-forte)] bg-[var(--superficie)] px-5 text-xs font-semibold uppercase tracking-widest text-[var(--texto)] transition-all duration-150 hover:bg-[var(--pilula-fundo)]"
            >
              <Mail size={14} /> E-mail
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!aceito || estado.fase === 'enviando'}
        className="mt-5 inline-flex h-11 items-center gap-2 rounded-[24px] bg-[var(--texto)] px-6 text-xs font-semibold uppercase tracking-widest text-[var(--fundo)] transition-all duration-150 hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
      >
        <Send size={14} />
        {estado.fase === 'enviando' ? 'Enviando…' : orcamento ? 'Quero receber a proposta' : 'Enviar'}
      </button>
    </form>
  )
}
