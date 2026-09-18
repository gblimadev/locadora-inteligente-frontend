import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Cadastro() {

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [numeroCnh, setNumeroCnh] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')

  const navigate = useNavigate()

  async function cadastrar(event: FormEvent) {

    event.preventDefault()

    const dados = {
      nome,
      cpf,
      telefone,
      senha,
      numeroCnh,
      dataNascimento
    }

    try {

      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário')
      }

      alert('Cadastro realizado com sucesso!')

      navigate('/login')

    } catch (error) {

      console.error(error)

      alert('Não foi possível realizar o cadastro')
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">
          <h1>LOCADORA</h1>
          <p>Crie sua conta</p>
        </div>

        <form className="login-form" onSubmit={cadastrar}>

          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite seu telefone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroCnh">Número da CNH</label>
            <input
              type="text"
              id="numeroCnh"
              value={numeroCnh}
              onChange={(e) => setNumeroCnh(e.target.value)}
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
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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