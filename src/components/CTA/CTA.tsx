import { useNavigate } from 'react-router-dom'
import './CTA.css'

function CTA() {

  const navigate = useNavigate()

  return (
    <section className="cta">

      <div className="cta-content">

        <span className="section-label">
          PRONTO PARA COMEÇAR?
        </span>

        <h2>
          Seu próximo destino
          <br />
          começa <span>aqui.</span>
        </h2>

        <p>
          Escolha seu carro, faça sua reserva e aproveite
          uma experiência simples, rápida e inteligente.
        </p>

      </div>

      <button
        className="primary-button"
        onClick={() => navigate('/carros')}
      >
        Encontrar meu carro
        <span>→</span>
      </button>

    </section>
  )
}

export default CTA
