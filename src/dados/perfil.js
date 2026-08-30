// Conteudo do site. Toda afirmacao aqui vem do curriculo mestre
// (farol/dia-0/curriculo-mestre.json) e do PDF de origem.
//
// REGRA: nada entra aqui sem estar no curriculo mestre. O valor de R$ 800 mil
// de banco de horas esta marcado como "_confirmar" no arquivo de origem e por
// isso NAO aparece no site — usamos os 80% de reducao, que estao textuais no
// PDF sob a experiencia da Dock.

export const perfil = {
  nome: 'Gustavo Virgilio Joaquim',
  cargo: 'Coordenador de People Analytics',
  empresa: 'Alloha Fibra',
  local: 'São Paulo, SP',
  email: 'gustavovj.emp@gmail.com',
  telefone: '+55 11 96342-2466',
  telefoneNumerico: '5511963422466',
  linkedin: 'https://www.linkedin.com/in/gustavo-virgilio-joaquim',
  github: 'https://github.com/GuVJ',
}

export const pitch = {
  titulo: 'Dado de gente que vira decisão de negócio.',
  texto:
    'Sete anos em People Analytics, do estágio no Santander à coordenação na Alloha Fibra. Levanto o requisito, trato o dado, construo o painel — e a ferramenta, quando o painel não resolve.',
  acoes: [
    { rotulo: 'Ver os cases', alvo: '#cases', principal: true },
    { rotulo: 'Tenho um projeto', alvo: '#orcamento' },
  ],
}

export const numeros = [
  { valor: '7 anos', rotulo: 'em People Analytics', detalhe: 'Santander, Adventures, Dock, BMG e Alloha.' },
  { valor: '80%', rotulo: 'de corte no banco de horas', detalhe: 'Com gestão contra sem gestão, na Dock.' },
  { valor: 'R$ 300 mil', rotulo: 'por mês sob gestão', detalhe: 'Orçamento de sobreaviso, em ferramenta própria.' },
  { valor: '700+', rotulo: 'desligamentos processados', detalhe: 'Sistema de offboarding integrando quatro áreas.' },
]

export const comoTrabalho = [
  { titulo: 'Entendo o problema, não o pedido', texto: 'O painel pedido quase nunca é o que resolve.' },
  { titulo: 'Trato o dado até ele ser confiável', texto: 'Número que não fecha com a folha não sobe.' },
  { titulo: 'Construo a ferramenta quando falta processo', texto: 'Cadastro, fluxo, alerta e trilha de auditoria.' },
  { titulo: 'Meço se estão usando', texto: 'Entrega sem adoção é custo, não valor.' },
]

export const trajetoria = [
  {
    empresa: 'Alloha Fibra',
    cargo: 'Coordenador de People Analytics',
    periodo: 'fev/2025 — atual',
    atual: true,
    resumo: 'Time de duas pessoas, nove áreas de RH atendidas numa operação nacional.',
    stack: ['Databricks', 'SQL', 'Power BI', 'Python', 'GenAI'],
  },
  {
    empresa: 'Banco BMG',
    cargo: 'People Analytics Sênior',
    periodo: 'mar/2024 — nov/2024',
    resumo: 'Estruturação de People Analytics para o grupo financeiro.',
    stack: ['SQL', 'Power BI'],
  },
  {
    empresa: 'Dock',
    cargo: 'People Analyst → Senior People Analyst',
    periodo: 'mar/2022 — mar/2024',
    resumo: 'Do requisito ao sistema no ar. Offboarding, sobreaviso e banco de horas.',
    stack: ['PostgreSQL', 'AppSheet', 'Looker Studio', 'Python'],
  },
  {
    empresa: 'Adventures',
    cargo: 'People Analyst',
    periodo: 'jul/2021 — mar/2022',
    resumo: 'Implantei a área de People Analytics do zero.',
    stack: ['Python', 'pandas', 'Looker Studio'],
  },
  {
    empresa: 'Santander',
    cargo: 'Jovem Aprendiz → Estagiário → Analista Jr',
    periodo: 'dez/2017 — jul/2021',
    resumo: 'Onde começou. Automação em VBA aos 18 e a primeira plataforma de RH que construí.',
    stack: ['Power BI', 'Qlik Sense', 'SQL', 'SAS', 'VBA'],
  },
]

export const stack = [
  {
    grupo: 'Visualização',
    itens: ['Power BI', 'Qlik Sense', 'Looker Studio', 'Streamlit'],
  },
  {
    grupo: 'Dados',
    itens: ['SQL', 'Databricks', 'PostgreSQL', 'Python', 'pandas', 'SAS', 'RM Totvs'],
  },
  {
    grupo: 'Construção',
    itens: ['React', 'JavaScript', 'HTML e CSS', 'VBA e RPA', 'AppSheet', 'Supabase'],
  },
  {
    grupo: 'Inteligência artificial',
    itens: ['GenAI no Databricks', 'Claude Code', 'Integração com LLM em produção', 'Gemini API'],
  },
]

export const projetos = [
  {
    nome: 'People Analytics Platform',
    tipo: 'Projeto autoral',
    resumo:
      'Plataforma completa de People Analytics sobre uma montadora fictícia — do headcount ao desempenho.',
    detalhes: [
      'Copiloto de IA e modelo preditivo de risco de saída',
      'Simulador de custo de rescisão pela Lei 12.506/2011',
    ],
    stack: ['React', 'Vite', 'Gemini', 'Recharts'],
    links: [{ rotulo: 'Ver no ar', url: 'https://peopleplataform.vercel.app' }],
  },
  {
    nome: 'CRM Fluxo',
    tipo: 'Projeto PJ · cliente real',
    resumo:
      'CRM sob medida para um escritório de contabilidade, do banco à tela. Em produção, usado todo dia.',
    detalhes: [
      'Acesso por perfil: consultor só enxerga os próprios leads',
      'Assistente de IA que respeita esse mesmo filtro',
    ],
    stack: ['React', 'Supabase', 'Clerk', 'Gemini'],
    links: [],
  },
  {
    nome: 'IA que sugere respostas em conversa',
    tipo: 'Projeto autoral · arquitetura',
    destaque: true,
    resumo:
      'Monta o contexto da conversa, chama o modelo e devolve sugestões prontas para revisão.',
    detalhes: [
      'Briefing compacto em vez de histórico cru no prompt, com fallback entre modelos',
      'Extensão MV3 e painel remoto conversando por polling, sem empurrar nada',
    ],
    stack: ['Gemini', 'Next.js', 'Supabase', 'Chrome MV3'],
    links: [],
  },
]

export const casesProfissionais = [
  {
    titulo: 'Offboarding que deixou de ser risco',
    empresa: 'Dock',
    periodo: '2023 — 2024',
    resumo: 'Quatro áreas, nenhum sistema ligando uma na outra. Construí a ferramenta que orquestrou o fluxo inteiro.',
    resultados: [
      '700+ desligamentos processados',
      '4 áreas num fluxo único e rastreável',
      'Risco operacional e retrabalho eliminados',
    ],
    stack: ['AppSheet', 'PostgreSQL', 'Looker Studio'],
  },
  {
    titulo: 'Banco de horas que parou de sangrar',
    empresa: 'Dock',
    periodo: '2022 — 2023',
    resumo: 'O passivo crescia sem gestão e o custo só aparecia na conta. Ferramenta de saldo mais insight semanal por gestor.',
    resultados: [
      '80% de corte no custo',
      'Passivo administrado durante o ano, não no fechamento',
      'Cada gestor com o número do seu time, a tempo de agir',
    ],
    stack: ['AppSheet', 'PostgreSQL', 'E-mail automático'],
  },
  {
    titulo: 'Uma área de People Analytics do zero',
    empresa: 'Adventures',
    periodo: '2021 — 2022',
    resumo: 'Não existia indicador, fonte nem rotina. Montei a área inteira, do ETL ao portal de RH.',
    resultados: [
      'Área implantada do zero em 9 meses',
      'ETL, painéis e insight por e-mail automatizados',
      'Portal próprio para RH e gestores',
    ],
    stack: ['Python', 'pandas', 'Looker Studio'],
  },
  {
    titulo: 'O ritmo semanal que gera a decisão',
    empresa: 'Alloha Fibra',
    periodo: '2025 — atual',
    resumo: 'Painel que ninguém abre não muda decisão. Reunião semanal em cima do dashboard, com fechamento mensal.',
    resultados: [
      '9 áreas atendidas como suporte principal',
      'Desvio aparece em dias, não no fechamento',
      'Time de duas pessoas sustentando a operação',
    ],
    stack: ['Databricks', 'SQL', 'Power BI', 'GenAI'],
  },
]

export const servicos = [
  { titulo: 'Dashboards e BI', texto: 'Do dado cru ao painel que a liderança abre toda semana.' },
  { titulo: 'Automação de processo', texto: 'O relatório que alguém refaz na mão toda semana.' },
  { titulo: 'Ferramenta interna sob medida', texto: 'Cadastro, aprovação e auditoria, com acesso por perfil.' },
  { titulo: 'People Analytics do zero', texto: 'Quais indicadores, de onde tirar e quem olha.' },
  { titulo: 'IA no que já existe', texto: 'Copiloto sobre a sua base, com o número vindo do banco.' },
  { titulo: 'Segurança do trabalho', texto: 'TRCF, LTIF, EPI e treinamentos de NR. Sou técnico na área.' },
]

export const formacao = [
  {
    curso: 'Análise e Desenvolvimento de Sistemas',
    grau: 'Tecnólogo',
    instituicao: 'Fatec Ipiranga — Pastor Enéas Tognini',
    periodo: '2019 — 2024',
  },
  {
    curso: 'Técnico em Segurança do Trabalho',
    grau: 'Ensino Técnico',
    instituicao: 'Etec Pirituba',
    periodo: '2017 — 2018',
  },
  {
    curso: 'Técnico em Tecnologia da Informação',
    grau: 'Ensino Técnico',
    instituicao: 'Etec Paulistano',
    periodo: '2014 — 2016',
  },
]
