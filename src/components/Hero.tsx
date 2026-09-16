function Hero() {
  return (
    <section className="hero">

      <div className="hero-background"></div>

      <div className="hero-content">

        <div className="hero-badge">
          <span></span>
          LOCAÇÃO INTELIGENTE
        </div>

        <h1>
          O carro certo.
          <br />
          <span>Do seu jeito.</span>
        </h1>

        <p>
          Encontre o veículo ideal para você.
          Escolha suas preferências, compare opções
          e faça sua reserva de maneira rápida e segura.
        </p>

        <div className="hero-buttons">

          <button className="primary-button">
            Encontrar meu carro
            <span>→</span>
          </button>

          <button className="outline-button">
            Ver veículos
          </button>

        </div>

        <div className="hero-stats">

          <div>
            <strong>+50</strong>
            <span>Veículos</span>
          </div>

          <div>
            <strong>24h</strong>
            <span>Atendimento</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Seguro</span>
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="glow"></div>

        <div className="car-card">

          <div className="car-top">
            <span>DESTAQUE</span>
            <span>2026</span>
          </div>

          <div className="car-image">
            🚘
          </div>

          <div className="car-info">

            <div>
              <span className="car-category">
                ESPORTIVO
              </span>

              <h2>Seu próximo carro</h2>
            </div>

            <div className="car-price">
              <strong>R$ 199</strong>
              <span>/dia</span>
            </div>

          </div>

          <button className="car-button">
            Ver detalhes →
          </button>

        </div>

      </div>

    </section>
  )
}

export default Hero