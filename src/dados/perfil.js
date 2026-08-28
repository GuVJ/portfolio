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
  clt: {
    rotulo: 'Contratação CLT',
    titulo: 'Dado de gente que vira decisão de negócio.',
    texto:
      'Sete anos em People Analytics, sempre dentro do RH — do estágio no Santander à coordenação na Alloha Fibra, onde lidero um time de duas pessoas e atendo nove áreas numa operação nacional. Levanto o requisito, faço o ETL, construo o dashboard e, quando o dashboard não resolve, construo a ferramenta.',
    cta: 'Ver minha trajetória',
    ctaAlvo: '#trajetoria',
  },
  pj: {
    rotulo: 'Projeto PJ',
    titulo: 'Do requisito ao sistema no ar.',
    texto:
      'Entrego projeto fechado: dashboard, automação de processo ou ferramenta interna sob medida. Já coloquei no ar CRM com autenticação, banco e IA para cliente real, e plataformas de análise completas. Escopo, prazo e entrega — sem precisar montar um time inteiro para começar.',
    cta: 'Ver o que eu entrego',
    ctaAlvo: '#servicos',
  },
}

export const numeros = [
  {
    valor: '7 anos',
    rotulo: 'dedicados a People Analytics',
    detalhe: 'Desde 2019, sempre na mesma especialidade — Santander, Adventures, Dock, BMG e Alloha Fibra.',
  },
  {
    valor: '80%',
    rotulo: 'de redução no custo de banco de horas',
    detalhe: 'Comparando o período com gestão das ferramentas que construí contra o período sem gestão, na Dock.',
  },
  {
    valor: 'R$ 300 mil',
    rotulo: 'por mês em orçamento sob gestão',
    detalhe: 'Orçamento mensal de sobreaviso administrado por uma ferramenta que desenvolvi e sustentei.',
  },
  {
    valor: '700+',
    rotulo: 'desligamentos processados',
    detalhe: 'Sistema de offboarding integrando Business Partners, Folha, Suporte de Equipamentos e Segurança da Informação.',
  },
]

export const comoTrabalho = [
  {
    titulo: 'Entendo o problema, não o pedido',
    texto:
      'Levantamento de requisito direto com o cliente interno. Quase sempre o dashboard pedido não é o que resolve — descobrir isso antes economiza semanas.',
  },
  {
    titulo: 'Trato o dado até ele ser confiável',
    texto:
      'ETL em SQL e Python. Se o número não fecha com a folha ou com a operação, o dashboard não sobe. Indicador em que a área não confia não é usado.',
  },
  {
    titulo: 'Construo a ferramenta quando o dashboard não basta',
    texto:
      'Boa parte dos problemas de RH não é falta de visualização, é falta de processo. Nesses casos entrego o sistema: cadastro, fluxo, alerta e trilha de auditoria.',
  },
  {
    titulo: 'Meço se estão usando',
    texto:
      'Na Dock eu mantinha Google Analytics no portal de People Analytics para saber quais entregas pegavam e quais eram só bonitas. Entrega sem adoção é custo, não valor.',
  },
]

export const trajetoria = [
  {
    empresa: 'Alloha Fibra',
    cargo: 'Coordenador de People Analytics',
    periodo: 'fev/2025 — atual',
    atual: true,
    setor: 'Telecomunicações',
    resumo:
      'Lidero um time de duas pessoas e sustento a operação de dados de RH de uma companhia nacional, atendendo nove áreas como suporte principal.',
    destaques: [
      'Acompanhamento semanal de headcount, turnover e custo de rescisão, absenteísmo, horas extras, segurança do trabalho e seleção',
      'Fechamento mensal com despesa de pessoal, posicionamento salarial e orçamento',
      'Dashboards de segurança do trabalho — TRCF, LTIF, consumo de EPI, acidentes, paralisações e treinamentos de NRs',
      'Pesquisas de GPTW e eNPS',
    ],
    stack: ['SQL', 'Databricks', 'RM Totvs', 'Python', 'Power BI', 'GenAI'],
  },
  {
    empresa: 'Banco BMG',
    cargo: 'People Analytics Sênior',
    periodo: 'mar/2024 — nov/2024',
    setor: 'Financeiro',
    resumo: 'Estruturação e entrega de People Analytics para o Grupo Financeiro BMG.',
    destaques: [],
    stack: ['SQL', 'Power BI'],
  },
  {
    empresa: 'Dock',
    cargo: 'People Analyst → Senior People Analyst',
    periodo: 'mar/2022 — mar/2024',
    setor: 'Fintech e meios de pagamento',
    resumo:
      'Responsável pela frente operacional e estratégica de People Analytics, do requisito ao sistema no ar.',
    destaques: [
      'Sistema de offboarding que processou mais de 700 desligamentos, integrando quatro áreas',
      'Ferramenta de gestão de sobreaviso com cerca de R$ 300 mil por mês em orçamento',
      'Redução de 80% no custo de banco de horas',
      'Portal de People Analytics com Google Analytics próprio para medir adoção interna',
      'Governança: painel diagnóstico de todos os dashboards e ferramentas compartilhadas',
    ],
    stack: ['PostgreSQL', 'AppSheet', 'Looker Studio', 'Python'],
  },
  {
    empresa: 'Adventures, Inc',
    cargo: 'People Analyst',
    periodo: 'jul/2021 — mar/2022',
    setor: 'Tecnologia',
    resumo:
      'Implantação da área de People Analytics do zero, incluindo o portal usado por RH e gestores de outras áreas.',
    destaques: [
      'ETL em Python com pandas via Google Colab',
      'Disparo automático de e-mail com insight personalizado',
      'Plataforma de People Analytics servindo como portal interno',
    ],
    stack: ['Python', 'pandas', 'Looker Studio'],
  },
  {
    empresa: 'Santander',
    cargo: 'Jovem Aprendiz → Estagiário → Analista Jr de People Analytics',
    periodo: 'dez/2017 — jul/2021',
    setor: 'Financeiro',
    resumo:
      'Onde a carreira começou. Automação desde o primeiro emprego, aos 18 anos, e a primeira plataforma de informações de RH que construí.',
    destaques: [
      'Plataforma de Informações do RH em HTML, CSS, JavaScript e jQuery, via mashup do Qlik Sense',
      'Dashboards de saúde, seleção, horas extras e ajuizamentos',
      'RPA em VBA com Selenium para cadastro online, ainda como Jovem Aprendiz',
    ],
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
    itens: ['GenAI no Databricks', 'Integração com LLM em produção', 'Gemini API'],
  },
]

export const projetos = [
  {
    nome: 'People Analytics Platform',
    tipo: 'Projeto autoral',
    resumo:
      'Plataforma completa de People Analytics construída do zero, sobre uma montadora fictícia. Cobre o ciclo inteiro: headcount, turnover, absenteísmo, horas extras, diversidade, treinamentos e desempenho.',
    detalhes: [
      'Copiloto de IA que responde pergunta em linguagem natural sobre a base, com o número calculado localmente e só o texto vindo do modelo',
      'Modelo preditivo de risco de saída, mostrando os fatores que puxam o risco de cada pessoa',
      'Workforce planning, organograma navegável e orçamento com meta versus realizado',
      'Simulador de custo de rescisão seguindo a Lei 12.506/2011 — aviso prévio, 13º e férias proporcionais, multa de FGTS',
    ],
    stack: ['React', 'Vite', 'Gemini', 'Recharts'],
    nota: 'Dados 100% fictícios, gerados em tempo de execução.',
    links: [{ rotulo: 'Ver no ar', url: 'https://peopleplataform.vercel.app' }],
  },
  {
    nome: 'CRM Fluxo',
    tipo: 'Projeto PJ · cliente real',
    resumo:
      'CRM sob medida para um escritório de contabilidade, do banco de dados à tela. Em produção, usado por consultores no dia a dia.',
    detalhes: [
      'Controle de acesso por perfil: admin enxerga tudo, consultor enxerga apenas os próprios leads',
      'Dashboard de indicadores calculados sobre os leads reais, com alerta de lead parado',
      'Importação de planilha Excel e seis relatórios exportáveis',
      'Assistente de IA que responde sobre a carteira, respeitando o filtro de perfil de quem pergunta',
      'Consulta de CNPJ em tempo real e link direto para WhatsApp',
    ],
    stack: ['React', 'Supabase', 'Clerk', 'Gemini', 'SheetJS'],
    nota: 'Projeto entregue como PJ, do levantamento ao deploy.',
    links: [],
  },
  {
    nome: 'Assistente de conversas',
    tipo: 'Projeto autoral · arquitetura',
    destaque: true,
    resumo:
      'Um assistente que lê o histórico de uma conversa e escreve sugestões de resposta prontas para revisão. Resolve o problema de quem precisa responder muita mensagem sem perder o fio de cada uma — e o desenho inteiro gira em torno de manter a decisão com a pessoa.',
    detalhes: [
      'Enviar exige dois cliques deliberados, e sugestão marcada como incerta trava o envio até revisão',
      'Extensão de navegador em Manifest V3 com painel web separado para controle remoto',
      'O problema técnico interessante: content script em MV3 não faz chamada cross-origin. Inverti o fluxo — o painel grava uma linha de comando no banco e a aba pergunta a cada 4 segundos se há algo novo. Nada é empurrado para a máquina de ninguém',
      'Entrada por e-mail e senha com segundo fator TOTP, códigos de resgate guardados apenas como hash',
      'RLS exigindo um cabeçalho próprio além da chave pública — a chave sozinha não abre nenhuma tabela',
    ],
    stack: ['Next.js', 'Supabase', 'Chrome MV3', 'Gemini'],
    nota: 'O caso de uso original foi um app de mensagens, mas a arquitetura é agnóstica: serve para qualquer fluxo em que alguém precisa responder muita mensagem com contexto.',
    links: [],
  },
]

export const casesProfissionais = [
  {
    titulo: 'Offboarding orquestrado',
    empresa: 'Dock',
    texto:
      'O desligamento passava por quatro áreas sem sistema que ligasse uma na outra. Construí a ferramenta que orquestrou o fluxo inteiro e deu rastreabilidade ao processo. Mais de 700 desligamentos passaram por ela.',
  },
  {
    titulo: 'Banco de horas sob controle',
    empresa: 'Dock',
    texto:
      'O passivo crescia sem gestão ativa e o custo de quitação era imprevisível. Ferramenta de acompanhamento mais e-mail semanal de insight para cada gestor derrubaram o custo em 80%.',
  },
  {
    titulo: 'Portal que se mede',
    empresa: 'Dock',
    texto:
      'Criei o portal interno de People Analytics e coloquei Google Analytics nele. Saber qual dashboard era de fato aberto mudou a priorização do time inteiro.',
  },
]

export const servicos = [
  {
    titulo: 'Dashboards e BI',
    texto:
      'Do dado cru ao painel que a liderança abre toda semana. Power BI, Looker Studio ou Streamlit, conforme onde a informação já mora.',
  },
  {
    titulo: 'Automação de processo',
    texto:
      'Planilha preenchida na mão toda semana, relatório recorrente, disparo de e-mail, extração repetitiva. Python, SQL e RPA quando é a única porta.',
  },
  {
    titulo: 'Ferramenta interna sob medida',
    texto:
      'Quando o problema é processo e não visualização: cadastro, fluxo de aprovação, alerta e trilha de auditoria. React e Supabase, com autenticação e controle de acesso por perfil.',
  },
  {
    titulo: 'People Analytics para RH sem time de dados',
    texto:
      'Estruturação da área do zero: quais indicadores acompanhar, de onde tirar, com que frequência e quem olha. Já fiz isso na Adventures e é o que sustento hoje na Alloha.',
  },
  {
    titulo: 'IA aplicada a processo que já existe',
    texto:
      'Copiloto sobre a sua base, classificação de texto, resumo de volume grande. Sempre com o número vindo do sistema e o modelo cuidando só da linguagem.',
  },
  {
    titulo: 'Indicadores de segurança do trabalho',
    texto:
      'TRCF, LTIF, consumo de EPI, ASO e treinamentos de NR. Sou técnico em Segurança do Trabalho além de analista — combinação rara em quem mexe com dado de gente.',
  },
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
