import { Link } from 'react-router-dom'

function Cadastro() {
  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">
          <h1>LOCADORA</h1>
          <p>Crie sua conta</p>
        </div>

        <form className="login-form">

          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              placeholder="Digite seu telefone"
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

          <div className="form-group">
            <label htmlFor="numeroCnh">Número da CNH</label>
            <input
              type="text"
              id="numeroCnh"
              placeholder="Digite o número da sua CNH"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">
              Data de nascimento
            </label>

            <input
              type="date"
              id="dataNascimento"
            />
          </div>

          <button type="submit" className="login-button">
            Criar conta
          </button>

        </form>

        <div className="login-footer">
          <p>Já possui uma conta?</p>

          <Link to="/login" className="nav-button">
            Entrar
        </Link>
        </div>

      </div>

    </div>
  )
}

export default Cadastro