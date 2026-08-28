// ============================================================================
// ESCOPO — o que o assistente pergunta e quanto esforco cada resposta gera.
//
// NAO HA DINHEIRO NESTE ARQUIVO, de proposito. Este modulo entra no bundle que
// vai para o navegador; qualquer constante aqui e legivel no devtools. Valor
// hora, piso e faixa vivem em `precos.private.js`, que fica fora do repo e nao
// e importado por nada dentro de `src/`.
//
// O site mostra escopo, prazo e entregas. O valor sai na conversa.
// ============================================================================

// Horas produtivas por semana dedicadas a projeto PJ. O Gustavo e CLT em tempo
// integral — isto e trabalho de noite e fim de semana, e o prazo tem que
// refletir isso.
export const HORAS_POR_SEMANA = 12

// Acima disto o projeto deixa de caber em regime PJ noturno. Em vez de prometer
// um prazo que ninguem cumpre, o assistente propoe fasear.
export const PRAZO_MAXIMO_SEMANAS = 14

// ---------------------------------------------------------------------------
// Tipos de projeto. `horas` e a estimativa central de um projeto de porte
// medio daquele tipo, ja incluindo levantamento, construcao e entrega.
// ---------------------------------------------------------------------------
export const TIPOS = [
  {
    id: 'dashboard',
    rotulo: 'Dashboard ou BI',
    descricao: 'Um painel que a liderança abre toda semana, com o dado tratado por trás.',
    horas: 40,
    entrega: ['Levantamento dos indicadores', 'ETL do dado', 'Painel publicado', 'Passagem de conhecimento'],
  },
  {
    id: 'automacao',
    rotulo: 'Automação de processo',
    descricao: 'Aquela planilha ou relatório que alguém refaz na mão toda semana.',
    horas: 30,
    entrega: ['Mapeamento do processo atual', 'Rotina automatizada', 'Alerta quando falhar', 'Documentação'],
  },
  {
    id: 'ferramenta',
    rotulo: 'Ferramenta interna sob medida',
    descricao: 'Cadastro, fluxo de aprovação, trilha de auditoria — quando o problema é processo, não gráfico.',
    horas: 90,
    entrega: ['Levantamento com quem usa', 'Banco e regras', 'Telas', 'Deploy e ajuste pós-uso'],
  },
  {
    id: 'people',
    rotulo: 'People Analytics do zero',
    descricao: 'Estruturar a área: quais indicadores, de onde tirar, com que frequência e quem olha.',
    horas: 120,
    entrega: ['Diagnóstico das fontes', 'Régua de indicadores', 'Painéis do ciclo', 'Rotina de fechamento'],
  },
  {
    id: 'ia',
    rotulo: 'IA acoplada ao que já existe',
    descricao: 'Copiloto sobre a sua base, classificação de texto ou resumo de volume grande.',
    horas: 50,
    entrega: ['Desenho do contexto', 'Integração com o modelo', 'Validação da resposta', 'Controle de custo'],
  },
  {
    id: 'seguranca',
    rotulo: 'Indicadores de segurança do trabalho',
    descricao: 'TRCF, LTIF, consumo de EPI, ASO e treinamentos de NR.',
    horas: 45,
    entrega: ['Leitura da base atual', 'Cálculo dos índices', 'Painel de acompanhamento', 'Rotina de atualização'],
  },
]

// ---------------------------------------------------------------------------
// Perguntas. Cada opcao carrega um `fator` (multiplica as horas) ou um
// `horasExtras` (soma). `alerta` vira observacao no orcamento final.
// ---------------------------------------------------------------------------
export const PERGUNTAS = [
  {
    id: 'fonte',
    pergunta: 'De onde vem o dado hoje?',
    ajuda: 'É o que mais mexe no prazo — dado espalhado custa mais que dado organizado.',
    opcoes: [
      { id: 'planilha', rotulo: 'Planilha ou CSV', fator: 1.0 },
      { id: 'banco', rotulo: 'Banco de dados ou sistema com API', fator: 1.15 },
      { id: 'varios', rotulo: 'Vários sistemas que não conversam', fator: 1.45 },
      {
        id: 'naosei',
        rotulo: 'Ainda não sei',
        fator: 1.25,
        alerta: 'Como a origem do dado ainda não está clara, a primeira etapa vira um diagnóstico curto — e a faixa aperta depois dele.',
      },
    ],
  },
  {
    id: 'porte',
    pergunta: 'Qual o tamanho da coisa?',
    ajuda: 'Uma tela e um indicador é bem diferente de um ciclo inteiro.',
    opcoes: [
      { id: 'pequeno', rotulo: 'Enxuto — um painel, um processo', fator: 0.7 },
      { id: 'medio', rotulo: 'Médio — alguns painéis ou telas', fator: 1.0 },
      { id: 'grande', rotulo: 'Grande — uma área inteira', fator: 1.6 },
    ],
  },
  {
    id: 'acesso',
    pergunta: 'Precisa de login e níveis de acesso?',
    ajuda: 'Cada pessoa vendo só o que é dela muda a arquitetura, não só a tela.',
    opcoes: [
      { id: 'nao', rotulo: 'Não, todo mundo vê tudo', horasExtras: 0 },
      { id: 'sim', rotulo: 'Sim, cada perfil vê o seu', horasExtras: 25 },
    ],
  },
  {
    id: 'prazo',
    pergunta: 'Qual a urgência?',
    ajuda: 'Prazo apertado significa noite e fim de semana, e isso entra no valor.',
    opcoes: [
      { id: 'tranquilo', rotulo: 'Sem pressa', fator: 1.0 },
      { id: 'normal', rotulo: 'Algumas semanas', fator: 1.0 },
      {
        id: 'urgente',
        rotulo: 'Para ontem',
        fator: 1.3,
        alerta: 'Prazo curto entra como adicional porque comprime o cronograma em noites e fins de semana.',
      },
    ],
  },
  {
    id: 'depois',
    pergunta: 'E depois de entregue?',
    ajuda: 'Dá para entregar e sair, ou ficar cuidando.',
    opcoes: [
      { id: 'entrega', rotulo: 'Só a entrega, a gente cuida daqui', suporte: false },
      { id: 'suporte', rotulo: 'Quero suporte mensal', suporte: true },
    ],
  },
]

// ---------------------------------------------------------------------------
// Texto de abertura e roteiro do assistente.
// ---------------------------------------------------------------------------
export const ROTEIRO = {
  saudacao:
    'Oi. Sou o assistente do Gustavo. Faço cinco perguntas para entender o que você precisa e te devolvo o escopo e o prazo já organizados.',
  comoFunciona: 'Leva menos de um minuto. No fim você leva o resumo pronto para enviar, e o Gustavo já responde com a proposta.',
  primeiraPergunta: 'Para começar: que tipo de projeto é?',
  pedidoDeTexto: 'Quer contar em uma ou duas linhas o que trava hoje? Ajuda a apontar o risco certo — mas pode pular.',
  encerramento: 'Pronto — é isso que eu entendi do seu projeto. Manda o resumo pelo botão que o Gustavo volta com a proposta.',
}

// Explica por que nao ha numero na tela. Sem isto, a ausencia de preco parece
// enrolacao; com isto, parece criterio.
export const AVISO =
  'O prazo acima é estimativa a partir do que você respondeu. O valor sai na conversa: depende de detalhes que só aparecem olhando a sua base, e prefiro te dar um número que se sustenta a um que muda depois.'
