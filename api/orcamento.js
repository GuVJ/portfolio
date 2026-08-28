// Comentario final do assistente de orcamento.
//
// O que esta funcao NAO faz: calcular preco. A faixa chega pronta, calculada
// em `src/logica/estimativa.js`, e o prompt proibe o modelo de alterar
// qualquer numero. Se ele inventasse um valor, o cliente teria em maos uma
// cotacao que ninguem calculou.
//
// Sem GEMINI_API_KEY a funcao devolve 503 e o front cai no texto local — o
// orcamento inteiro funciona sem IA, ela so deixa o fechamento mais humano.

const MODELO = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ erro: 'Use POST.' })
    return
  }

  const chave = process.env.GEMINI_API_KEY
  if (!chave) {
    res.status(503).json({ erro: 'Sem chave configurada.' })
    return
  }

  const { resumo, textoLivre } = req.body || {}
  if (!resumo || typeof resumo !== 'string') {
    res.status(400).json({ erro: 'Resumo ausente.' })
    return
  }

  // Corta entrada longa demais: o texto livre vem de campo aberto na internet.
  const relato = typeof textoLivre === 'string' ? textoLivre.slice(0, 800) : ''

  const prompt = [
    'Você é o assistente de orçamento do Gustavo Virgilio Joaquim, especialista em People Analytics, BI e automação, que faz projetos como PJ.',
    'Escreva um comentário curto (no máximo 3 frases, em português do Brasil, tom direto e sem formalidade excessiva) fechando o orçamento abaixo.',
    '',
    'REGRAS RÍGIDAS:',
    '- NÃO invente, altere, recalcule nem repita valores em reais. Os números já estão na tela; você comenta o contexto, não o preço.',
    '- Não prometa prazo diferente do que está no resumo.',
    '- Não use saudação nem despedida. Vá direto ao ponto.',
    '- Se o relato do cliente indicar um risco ou uma dúvida de escopo, aponte em uma frase.',
    '- Termine convidando a mandar a mensagem pelo botão, sem soar como vendedor.',
    '',
    'Resumo do pedido:',
    resumo,
    relato ? `\nRelato do cliente: ${relato}` : '',
  ].join('\n')

  try {
    const resposta = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent?key=${chave}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 400,
            // Sem isto o gemini-2.5-* gasta o orcamento de tokens pensando e a
            // resposta sai cortada no meio da frase.
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      },
    )

    if (!resposta.ok) {
      res.status(502).json({ erro: 'Modelo indisponível.' })
      return
    }

    const dados = await resposta.json()
    const texto = dados?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!texto) {
      res.status(502).json({ erro: 'Resposta vazia.' })
      return
    }

    res.status(200).json({ texto })
  } catch (e) {
    res.status(502).json({ erro: 'Falha ao consultar o modelo.' })
  }
}
