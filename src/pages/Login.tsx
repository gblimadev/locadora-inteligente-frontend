import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  async function fazerLogin(event: FormEvent) {

    event.preventDefault()

    setErro('')
    setCarregando(true)

    try {

      const resposta = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          cpf: cpf,
          senha: senha
        })
      })

      if (!resposta.ok) {
        throw new Error('CPF ou senha inválidos')
      }

      const dados = await resposta.json()

      localStorage.setItem('token', dados.token)

      navigate('/')

    } catch (error) {

      setErro('CPF ou senha inválidos')

    } finally {

      setCarregando(false)

    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">
          <h1>LOCADORA</h1>
          <p>Entre na sua conta</p>
        </div>

        <form
          className="login-form"
          onSubmit={fazerLogin}
        >

          <div className="form-group">

            <label htmlFor="cpf">
              CPF
            </label>

            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label htmlFor="senha">
              Senha
            </label>

            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

          </div>

          {erro && (
            <p className="login-error">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

        </form>

        <div className="login-footer">

          <p>
            Ainda não possui uma conta?
          </p>

          <Link
            to="/cadastro"
            className="register-button"
          >
            Criar conta
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Login