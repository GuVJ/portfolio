// Ponte com o Radar (o CRM). Quem se identifica no site vira lead
// classificado la, com score, segmento e temperatura.
//
// O site nao guarda nada por conta propria e nao rastreia visita anonima:
// so vai para o CRM quem preencheu o formulario e marcou o consentimento.

const RADAR = import.meta.env.VITE_RADAR_URL || 'https://radar-gustavo.vercel.app'

/**
 * Manda o contato para o CRM.
 *
 * Devolve `{ ok, retorno_em }` quando dá certo. Se o CRM estiver fora do ar,
 * lanca — e quem chama mostra os canais diretos (WhatsApp e e-mail), que
 * continuam funcionando sozinhos. O formulario e um atalho, nunca a unica
 * porta de contato.
 */
export async function mandarParaRadar(dados) {
  const resposta = await fetch(`${RADAR}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...dados,
      // Guarda de onde no site a pessoa veio, para o CRM saber o que
      // funciona: assistente de orcamento ou secao de contato.
      utm: Object.fromEntries(new URLSearchParams(window.location.search)),
    }),
  })

  const corpo = await resposta.json().catch(() => ({}))
  if (!resposta.ok) throw new Error(corpo.erro || 'Nao consegui enviar agora')
  return corpo
}
