import Cabecalho from './secoes/Cabecalho.jsx'
import Hero from './secoes/Hero.jsx'
import ComoTrabalho from './secoes/ComoTrabalho.jsx'
import Cases from './secoes/Cases.jsx'
import Trajetoria from './secoes/Trajetoria.jsx'
import Projetos from './secoes/Projetos.jsx'
import Servicos from './secoes/Servicos.jsx'
import Orcamento from './secoes/Orcamento.jsx'
import StackFormacao from './secoes/StackFormacao.jsx'
import Contato from './secoes/Contato.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Cabecalho />
      <main>
        <Hero />
        <ComoTrabalho tom="claro" />
        <Cases tom="escuro" />
        <Trajetoria tom="claro" />
        <Projetos tom="escuro" />
        <Servicos tom="claro" />
        <Orcamento tom="escuro" />
        <StackFormacao tom="claro" />
        <Contato tom="escuro" />
      </main>
    </div>
  )
}
