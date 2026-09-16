import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">
          <h1>LOCADORA</h1>
          <p>Entre na sua conta</p>
        </div>

        <form className="login-form">

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

        </form>

        <div className="login-footer">
          <p>
            Ainda não possui uma conta?
          </p>

          <Link to="/cadastro" className="register-button">
            Criar conta
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Login