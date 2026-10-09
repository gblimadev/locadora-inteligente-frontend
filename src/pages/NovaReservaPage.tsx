
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api'
import type { Carro } from '../types/Carro'
import './NovaReservaPage.css'

interface CarroApi {
  id: number
  marca: string
  modelo: string
  ano: number
  tipo: string
  combustivel: string
  cambio: string
  lugares: number
  precoDiaria: number
  disponivel: boolean
}

function NovaReservaPage() {
  const [carros, setCarros] = useState<Carro[]>([])
  const [carregandoCarros, setCarregandoCarros] = useState(true)
  const [enviando, setEnviando] = useState(false)

  const [carroId, setCarroId] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [reservaConfirmada, setReservaConfirmada] = useState(false)

  const carrosDisponiveis = carros.filter((carro) => carro.disponivel)

  const carroSelecionado: Carro | undefined = carrosDisponiveis.find(
    (carro) => carro.id === Number(carroId),
  )

  useEffect(() => {
    async function buscarCarros() {
      try {
        const dados = await apiFetch<CarroApi[]>('/carros')

        const carrosFormatados: Carro[] = dados.map((carro) => ({
          id: carro.id,
          marca: carro.marca,
          modelo: carro.modelo,
          ano: carro.ano,
          categoria: carro.tipo,
          transmissao: carro.cambio.toLowerCase().includes('auto')
            ? 'Automática'
            : 'Manual',
          combustivel: carro.combustivel,
          passageiros: carro.lugares,
          valorDiaria: Number(carro.precoDiaria),
          imagem: '',
          disponivel: carro.disponivel,
        }))

        setCarros(carrosFormatados)
      } catch (error) {
        setMensagem(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar os veículos.',
        )
      } finally {
        setCarregandoCarros(false)
      }
    }

    buscarCarros()
  }, [])

  const hoje = [
    new Date().getFullYear(),
    String(new Date().getMonth() + 1).padStart(2, '0'),
    String(new Date().getDate()).padStart(2, '0'),
  ].join('-')

  const quantidadeDias = useMemo(() => {
    if (!dataInicio || !dataFim || dataFim <= dataInicio) {
      return 0
    }

    const inicio = new Date(`${dataInicio}T00:00:00Z`).getTime()
    const fim = new Date(`${dataFim}T00:00:00Z`).getTime()

    return Math.round((fim - inicio) / (1000 * 60 * 60 * 24))
  }, [dataInicio, dataFim])

  const valorTotal = carroSelecionado
    ? quantidadeDias * carroSelecionado.valorDiaria
    : 0

  function formatarData(data: string) {
    if (!data) return 'Não selecionada'

    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function limparMensagem() {
    setMensagem('')
    setReservaConfirmada(false)
  }

  function handleDataInicio(data: string) {
    setDataInicio(data)
    limparMensagem()

    if (dataFim && dataFim <= data) {
      setDataFim('')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    limparMensagem()

    if (!carroSelecionado) {
      setMensagem('Selecione um veículo disponível.')
      return
    }

    if (!dataInicio || dataInicio < hoje) {
      setMensagem('Selecione uma data de retirada válida.')
      return
    }

    if (!dataFim || dataFim <= dataInicio) {
      setMensagem('A devolução deve ocorrer depois da retirada.')
      return
    }

    if (quantidadeDias <= 0) {
      setMensagem('Selecione um período válido para a locação.')
      return
    }

    // O nome desta chave precisa corresponder ao que seu login armazena.
    const usuarioId = Number(localStorage.getItem('usuario_id'))

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
      setMensagem(
        'Não foi possível identificar o usuário. Verifique a identificação utilizada pela autenticação.',
      )
      return
    }

    try {
      setEnviando(true)

      await apiFetch('/reservas', {
        method: 'POST',
        body: JSON.stringify({
          dataInicio,
          dataFim,
          usuario_id: usuarioId,
          carro_id: carroSelecionado.id,
        }),
      })

      setReservaConfirmada(true)
      setMensagem('Reserva criada com sucesso!')
    } catch (error) {
      setMensagem(
        error instanceof Error
          ? error.message
          : 'Não foi possível criar a reserva.',
      )
    } finally {
      setEnviando(false)
    }
  }

  function handleNovaReserva() {
    setCarroId('')
    setDataInicio('')
    setDataFim('')
    setMensagem('')
    setReservaConfirmada(false)
  }

  return (
    <main className="nova-reserva-page">
      <header className="nova-reserva-header">
        <div>
          <span className="nova-reserva-eyebrow">ÁREA DO CLIENTE</span>
          <h1>Nova reserva</h1>
          <p>Escolha seu veículo e planeje sua próxima viagem.</p>
        </div>

        <Link to="/carros" className="nova-reserva-voltar">
          <span aria-hidden="true">←</span>
          Voltar aos veículos
        </Link>
      </header>

      <div className="nova-reserva-layout">
        <section className="nova-reserva-form-card">
          <div className="nova-reserva-section-title">
            <span className="nova-reserva-number">01</span>
            <div>
              <h2>Detalhes da locação</h2>
              <p>Informe o veículo e o período desejado.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="nova-reserva-field">
              <label htmlFor="carro">Veículo disponível</label>

              <select
                id="carro"
                value={carroId}
                onChange={(event) => {
                  setCarroId(event.target.value)
                  limparMensagem()
                }}
                disabled={carregandoCarros || enviando || reservaConfirmada}
                required
              >
                <option value="">
                  {carregandoCarros
                    ? 'Carregando veículos...'
                    : 'Selecione um veículo'}
                </option>

                {carrosDisponiveis.map((carro) => (
                  <option key={carro.id} value={carro.id}>
                    {carro.marca} {carro.modelo} —{' '}
                    {formatarMoeda(carro.valorDiaria)}/dia
                  </option>
                ))}
              </select>
            </div>

            {!carregandoCarros && carrosDisponiveis.length === 0 && (
              <p role="status">
                Nenhum veículo disponível foi encontrado.
              </p>
            )}

            {carroSelecionado && (
              <div className="nova-reserva-carro-selecionado">
                <div className="nova-reserva-carro-icon" aria-hidden="true">
                  🚘
                </div>

                <div className="nova-reserva-carro-info">
                  <span>VEÍCULO SELECIONADO</span>
                  <h3>
                    {carroSelecionado.marca} {carroSelecionado.modelo}
                  </h3>
                  <p>
                    {carroSelecionado.ano} · {carroSelecionado.categoria} ·{' '}
                    {carroSelecionado.transmissao}
                  </p>
                </div>

                <strong>
                  {formatarMoeda(carroSelecionado.valorDiaria)}
                  <small>/dia</small>
                </strong>
              </div>
            )}

            <div className="nova-reserva-section-title nova-reserva-datas-title">
              <span className="nova-reserva-number">02</span>
              <div>
                <h2>Datas da locação</h2>
                <p>Selecione a retirada e a devolução.</p>
              </div>
            </div>

            <div className="nova-reserva-datas-grid">
              <div className="nova-reserva-field">
                <label htmlFor="dataInicio">Data de retirada</label>
                <input
                  id="dataInicio"
                  type="date"
                  value={dataInicio}
                  min={hoje}
                  onChange={(event) => handleDataInicio(event.target.value)}
                  disabled={enviando || reservaConfirmada}
                  required
                />
              </div>

              <div className="nova-reserva-field">
                <label htmlFor="dataFim">Data de devolução</label>
                <input
                  id="dataFim"
                  type="date"
                  value={dataFim}
                  min={dataInicio || hoje}
                  onChange={(event) => {
                    setDataFim(event.target.value)
                    limparMensagem()
                  }}
                  disabled={enviando || reservaConfirmada}
                  required
                />
              </div>
            </div>

            {quantidadeDias > 0 && (
              <div className="nova-reserva-periodo">
                <span aria-hidden="true">◷</span>
                Período selecionado:{' '}
                <strong>
                  {quantidadeDias}{' '}
                  {quantidadeDias === 1 ? 'diária' : 'diárias'}
                </strong>
              </div>
            )}

            {mensagem && (
              <div
                className={`nova-reserva-mensagem ${
                  reservaConfirmada ? 'mensagem-sucesso' : 'mensagem-erro'
                }`}
                role="status"
              >
                <span aria-hidden="true">
                  {reservaConfirmada ? '✓' : '!'}
                </span>
                {mensagem}
              </div>
            )}

            {!reservaConfirmada ? (
              <button
                type="submit"
                className="nova-reserva-submit"
                disabled={
                  carregandoCarros ||
                  enviando ||
                  carrosDisponiveis.length === 0
                }
              >
                {enviando ? 'Enviando reserva...' : 'Confirmar reserva'}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                type="button"
                className="nova-reserva-submit"
                onClick={handleNovaReserva}
              >
                Fazer outra reserva
                <span aria-hidden="true">↻</span>
              </button>
            )}

            <p className="nova-reserva-aviso">
              A reserva será validada e registrada pelo servidor.
            </p>
          </form>
        </section>

        <aside className="nova-reserva-resumo">
          <div className="nova-reserva-resumo-topo">
            <span className="nova-reserva-eyebrow">RESUMO</span>
            <h2>Sua locação</h2>
            <p>Confira os detalhes antes de continuar.</p>
          </div>

          <div className="nova-reserva-resumo-carro">
            <span className="nova-reserva-resumo-icone" aria-hidden="true">
              🚘
            </span>
            <div>
              <span>VEÍCULO</span>
              <strong>
                {carroSelecionado
                  ? `${carroSelecionado.marca} ${carroSelecionado.modelo}`
                  : 'Nenhum veículo selecionado'}
              </strong>
            </div>
          </div>

          <div className="nova-reserva-resumo-linha">
            <span>Retirada</span>
            <strong>{formatarData(dataInicio)}</strong>
          </div>

          <div className="nova-reserva-resumo-linha">
            <span>Devolução</span>
            <strong>{formatarData(dataFim)}</strong>
          </div>

          <div className="nova-reserva-resumo-linha">
            <span>Quantidade de diárias</span>
            <strong>{quantidadeDias}</strong>
          </div>

          <div className="nova-reserva-resumo-linha">
            <span>Valor por diária</span>
            <strong>
              {formatarMoeda(carroSelecionado?.valorDiaria ?? 0)}
            </strong>
          </div>

          <div className="nova-reserva-resumo-total">
            <span>Valor total estimado</span>
            <strong>{formatarMoeda(valorTotal)}</strong>
            <small>
              {quantidadeDias > 0
                ? `${quantidadeDias} ${
                    quantidadeDias === 1 ? 'diária' : 'diárias'
                  } × valor diário`
                : 'Selecione o veículo e as datas'}
            </small>
          </div>

          <div className="nova-reserva-seguranca">
            <span aria-hidden="true">ⓘ</span>
            <p>
              O valor é uma estimativa baseada na diária e no período
              selecionado. O servidor calcula o valor definitivo.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default NovaReservaPage
