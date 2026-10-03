import './Features.css'

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
          Uma experiência inteligente, moderna e simples
          para encontrar, reservar e aproveitar seu próximo veículo.
        </p>

      </div>


      <div className="features-grid">

        <div className="feature-card">

          <div className="feature-top">

            <span className="feature-number">
              01
            </span>

            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L4 14H11L10 22L20 9H13L13 2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>

          <h3>
            Escolha inteligente
          </h3>

          <p>
            Encontre veículos de acordo com suas preferências
            de modelo, desempenho, combustível, economia e conforto.
          </p>

          <span className="feature-line" />

        </div>


        <div className="feature-card featured-feature">

          <div className="feature-top">

            <span className="feature-number">
              02
            </span>

            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="15"
                  r="1.5"
                  fill="currentColor"
                />
              </svg>
            </div>

          </div>

          <h3>
            Segurança
          </h3>

          <p>
            Seus dados protegidos com autenticação segura
            e tecnologias modernas para uma experiência confiável.
          </p>

          <span className="feature-line" />

        </div>


        <div className="feature-card">

          <div className="feature-top">

            <span className="feature-number">
              03
            </span>

            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M16 3V7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M8 3V7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M3 10H21"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M8 14H8.01"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M12 14H12.01"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M16 14H16.01"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

          </div>

          <h3>
            Reserva simples
          </h3>

          <p>
            Escolha as datas, encontre um veículo disponível
            e faça sua reserva de maneira rápida e prática.
          </p>

          <span className="feature-line" />

        </div>

      </div>

    </section>
  )
}

export default Features