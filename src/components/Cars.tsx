function Cars() {
  return (
    <section className="cars-section">

      <div className="cars-heading">

        <div>

          <span className="section-label">
            NOSSA FROTA
          </span>

          <h2>
            Encontre seu
            <span> próximo carro.</span>
          </h2>

        </div>

        <button className="view-all">
          Ver todos →
        </button>

      </div>


      <div className="cars-grid">

        <div className="vehicle-card">

          <div className="vehicle-image">
            🚗
          </div>

          <div className="vehicle-info">

            <span>
              ECONÔMICO
            </span>

            <h3>
              Carro Econômico
            </h3>

            <div className="vehicle-details">
              <span>⚙ Automático</span>
              <span>⛽ Flex</span>
              <span>👤 5 lugares</span>
            </div>

            <div className="vehicle-footer">

              <div>
                <strong>R$ 99</strong>
                <small>/dia</small>
              </div>

              <button>
                →
              </button>

            </div>

          </div>

        </div>


        <div className="vehicle-card featured-vehicle">

          <div className="vehicle-image">
            🚘
          </div>

          <div className="vehicle-info">

            <span>
              ESPORTIVO
            </span>

            <h3>
              Carro Esportivo
            </h3>

            <div className="vehicle-details">
              <span>⚙ Automático</span>
              <span>⛽ Gasolina</span>
              <span>👤 5 lugares</span>
            </div>

            <div className="vehicle-footer">

              <div>
                <strong>R$ 199</strong>
                <small>/dia</small>
              </div>

              <button>
                →
              </button>

            </div>

          </div>

        </div>


        <div className="vehicle-card">

          <div className="vehicle-image">
            🚙
          </div>

          <div className="vehicle-info">

            <span>
              CONFORTO
            </span>

            <h3>
              Carro Premium
            </h3>

            <div className="vehicle-details">
              <span>⚙ Automático</span>
              <span>⛽ Flex</span>
              <span>👤 5 lugares</span>
            </div>

            <div className="vehicle-footer">

              <div>
                <strong>R$ 249</strong>
                <small>/dia</small>
              </div>

              <button>
                →
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Cars