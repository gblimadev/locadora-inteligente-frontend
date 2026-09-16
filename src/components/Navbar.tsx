function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        <span className="logo-icon">L</span>

        <span>
          LOCADORA<span className="logo-blue">.</span>
        </span>
      </div>

      <nav className="nav-links">
        <a href="#">Início</a>
        <a href="#">Carros</a>
        <a href="#">Reservas</a>
        <a href="#">Sobre nós</a>
      </nav>

      <button className="login-button">
        Entrar
      </button>

    </header>
  )
}

export default Navbar