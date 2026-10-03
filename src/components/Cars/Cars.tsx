import { useNavigate } from 'react-router-dom'
import './Cars.css'

function Cars() {
  const navigate = useNavigate()

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

          <p>
            Veículos selecionados para oferecer desempenho,
            conforto e praticidade em cada viagem.
          </p>
        </div>

        <button
          className="view-all"
          onClick={() => navigate('/carros')}
        >
          Ver todos
          <span>→</span>
        </button>

      </div>

      <div className="cars-grid">

        {/* CARRO ECONÔMICO */}

        <div className="vehicle-card">

          <div className="vehicle-image">

            <img
                src="https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1000&q=85"
                alt="Toyota Corolla"
            />

            <div className="vehicle-badge">
              DISPONÍVEL
            </div>

          </div>

          <div className="vehicle-info">

            <span className="vehicle-category">
              ECONÔMICO
            </span>

            <h3>
              Toyota Corolla
            </h3>

            <div className="vehicle-details">

              <span>
                ⚙ Automático
              </span>

              <span>
                ⛽ Híbrido
              </span>

              <span>
                👤 5 lugares
              </span>

            </div>

            <div className="vehicle-footer">

              <div>
                <strong>
                  R$ 250
                </strong>

                <small>
                  /dia
                </small>
              </div>

              <button
                onClick={() => navigate('/carros')}
                aria-label="Ver Toyota Corolla"
              >
                →
              </button>

            </div>

          </div>

        </div>

        {/* CARRO ESPORTIVO */}

        <div className="vehicle-card featured-vehicle">

          <div className="vehicle-image">

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85"
              alt="Porsche 911"
            />

            <div className="vehicle-badge featured-badge">
              DESTAQUE
            </div>

          </div>

          <div className="vehicle-info">

            <span className="vehicle-category">
              ESPORTIVO
            </span>

            <h3>
              Porsche 911
            </h3>

            <div className="vehicle-details">

              <span>
                ⚙ Automático
              </span>

              <span>
                ⛽ Gasolina
              </span>

              <span>
                👤 2 lugares
              </span>

            </div>

            <div className="vehicle-footer">

              <div>
                <strong>
                  R$ 899
                </strong>

                <small>
                  /dia
                </small>
              </div>

              <button
                onClick={() => navigate('/carros')}
                aria-label="Ver Porsche 911"
              >
                →
              </button>

            </div>

          </div>

        </div>

        {/* CARRO PREMIUM */}

        <div className="vehicle-card">

          <div className="vehicle-image">

            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85"
              alt="BMW Série 3"
            />

            <div className="vehicle-badge">
              DISPONÍVEL
            </div>

          </div>

          <div className="vehicle-info">

            <span className="vehicle-category">
              PREMIUM
            </span>

            <h3>
              BMW Série 3
            </h3>

            <div className="vehicle-details">

              <span>
                ⚙ Automático
              </span>

              <span>
                ⛽ Gasolina
              </span>

              <span>
                👤 5 lugares
              </span>

            </div>

            <div className="vehicle-footer">

              <div>
                <strong>
                  R$ 499
                </strong>

                <small>
                  /dia
                </small>
              </div>

              <button
                onClick={() => navigate('/carros')}
                aria-label="Ver BMW Série 3"
              >
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
