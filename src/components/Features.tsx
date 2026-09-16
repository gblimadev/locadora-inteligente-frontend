function Features() {
  return (
    <section className="features-section">

      <div className="section-heading">

        <div>

          <span className="section-label">
            POR QUE ESCOLHER A LOCADORA?
          </span>

          <h2>
            Tudo pensado para
            <span> você.</span>
          </h2>

        </div>

        <p>
          Uma experiência simples para encontrar,
          reservar e aproveitar seu próximo veículo.
        </p>

      </div>


      <div className="features-grid">

        <div className="feature-card">

          <div className="feature-number">
            01
          </div>

          <div className="feature-icon">
            ⚡
          </div>

          <h3>
            Escolha inteligente
          </h3>

          <p>
            Encontre veículos de acordo com suas
            preferências de modelo, desempenho,
            combustível e muito mais.
          </p>

        </div>


        <div className="feature-card active">

          <div className="feature-number">
            02
          </div>

          <div className="feature-icon">
            🔒
          </div>

          <h3>
            Segurança
          </h3>

          <p>
            Seus dados protegidos com autenticação
            segura e tecnologia moderna.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-number">
            03
          </div>

          <div className="feature-icon">
            📅
          </div>

          <h3>
            Reserva simples
          </h3>

          <p>
            Escolha as datas, encontre um veículo
            disponível e faça sua reserva.
          </p>

        </div>

      </div>

    </section>
  )
}

export default Features