import Cabecalho from './secoes/Cabecalho.jsx'
import Hero from './secoes/Hero.jsx'
import ComoTrabalho from './secoes/ComoTrabalho.jsx'
import Trajetoria from './secoes/Trajetoria.jsx'
import Projetos from './secoes/Projetos.jsx'
import Servicos from './secoes/Servicos.jsx'
import StackFormacao from './secoes/StackFormacao.jsx'
import Contato from './secoes/Contato.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Cabecalho />
      <main>
        <Hero />
        <ComoTrabalho />
        <Trajetoria />
        <Projetos />
        <Servicos />
        <StackFormacao />
        <Contato />
      </main>
    </div>
  )
}
