import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">

      <Link to="/" className="logo">
        <span className="logo-icon">
          L
        </span>

        <span>
          LOCADORA<span className="logo-blue">.</span>
        </span>
      </Link>

      <nav className="nav-links">

        <Link to="/">
          Início
        </Link>

        <Link to="/carros">
          Carros
        </Link>

        <Link to="/reservas">
          Reservas
        </Link>

        <a href="#sobre">
          Sobre nós
        </a>

      </nav>

      <Link to="/login" className="nav-button">
        Entrar
      </Link>

    </header>
  )
}

export default Navbar