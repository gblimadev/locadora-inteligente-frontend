import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <div className="footer-logo">

            <span className="logo-icon">
              L
            </span>

            <span>
              LOCADORA<span className="logo-blue">.</span>
            </span>

          </div>

          <p>
            Locação inteligente, simples e segura.
          </p>

        </div>

        <div className="footer-info">

          <span className="footer-status">
            <span className="status-dot"></span>
            SISTEMA ONLINE
          </span>

          <span className="copyright">
            © 2026 Locadora Inteligente
          </span>

        </div>

      </div>

      <div className="footer-line"></div>

      <div className="footer-bottom">

        <span>
          Desenvolvido com tecnologia moderna.
        </span>

        <span>
          Java · Spring Boot · React · TypeScript
        </span>

      </div>

    </footer>
  )
}

export default Footer
