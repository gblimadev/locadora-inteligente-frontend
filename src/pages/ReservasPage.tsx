import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ReservasPage.css'
import { reservasMock } from '../data/reservasMock'

function ReservasPage() {
const [busca, setBusca] = useState('')
const [statusFiltro, setStatusFiltro] = useState('todas')

const reservasFiltradas = reservasMock.filter((reserva) => {
const termo = busca.trim().toLowerCase()

const correspondeBusca =
  termo === '' ||
  `carro ${reserva.carro_id}`.toLowerCase().includes(termo) ||
  String(reserva.carro_id).includes(termo) ||
  String(reserva.id).includes(termo)

const correspondeStatus =
  statusFiltro === 'todas' ||
  reserva.status.toLowerCase() === statusFiltro

return correspondeBusca && correspondeStatus

})

const totalReservas = reservasMock.length

const totalConfirmadas = reservasMock.filter(
(reserva) => reserva.status === 'CONFIRMADA',
).length

const totalConcluidas = reservasMock.filter(
(reserva) => reserva.status === 'FINALIZADA',
).length

function formatarData(data: string) {
const [ano, mes, dia] = data.split('-')
return `${dia}/${mes}/${ano}`
}

function formatarStatus(status: string) {
const nomes: Record<string, string> = {
PENDENTE: 'Pendente',
CONFIRMADA: 'Confirmada',
EM_ANDAMENTO: 'Em andamento',
FINALIZADA: 'Concluída',
CANCELADA: 'Cancelada',
}

return nomes[status] ?? status

}

return ( <main className="reservas-page"> <header className="reservas-header"> <div className="reservas-header-text"> <span className="reservas-eyebrow">ÁREA DO CLIENTE</span> <h1>Minhas Reservas</h1> <p>Acompanhe suas viagens e gerencie suas locações.</p> </div>

    <Link to="/carros" className="reservas-nova-btn">
      <span aria-hidden="true">+</span>
      Nova reserva
    </Link>
  </header>

  <section className="reservas-stats" aria-label="Resumo das reservas">
    <article className="reserva-stat-card">
      <div className="reserva-stat-icon">🚘</div>
      <div className="reserva-stat-info">
        <span>Total de reservas</span>
        <strong>{totalReservas}</strong>
        <small>Reservas realizadas</small>
      </div>
    </article>

    <article className="reserva-stat-card">
      <div className="reserva-stat-icon">✓</div>
      <div className="reserva-stat-info">
        <span>Confirmadas</span>
        <strong>{totalConfirmadas}</strong>
        <small>Reservas confirmadas</small>
      </div>
    </article>

    <article className="reserva-stat-card">
      <div className="reserva-stat-icon">🏁</div>
      <div className="reserva-stat-info">
        <span>Concluídas</span>
        <strong>{totalConcluidas}</strong>
        <small>Locações finalizadas</small>
      </div>
    </article>
  </section>

  <section className="reservas-content">
    <div className="reservas-section-heading">
      <div>
        <h2>Suas locações</h2>
        <p>Consulte as datas, os valores e o status de cada reserva.</p>
      </div>

      <span className="reservas-contador">
        {reservasFiltradas.length}{' '}
        {reservasFiltradas.length === 1 ? 'reserva' : 'reservas'}
      </span>
    </div>

    <div className="reservas-toolbar">
      <div className="reservas-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Buscar por carro ou número da reserva..."
          aria-label="Buscar reservas"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />
      </div>

      <select
        value={statusFiltro}
        onChange={(event) => setStatusFiltro(event.target.value)}
        aria-label="Filtrar reservas por status"
      >
        <option value="todas">Todos os status</option>
        <option value="confirmada">Confirmadas</option>
        <option value="pendente">Pendentes</option>
        <option value="em_andamento">Em andamento</option>
        <option value="finalizada">Concluídas</option>
        <option value="cancelada">Canceladas</option>
      </select>
    </div>

    {reservasFiltradas.length === 0 ? (
      <div className="reservas-empty">
        <div className="reservas-empty-icon">🚘</div>
        <h3>Nenhuma reserva encontrada</h3>
        <p>
          Não encontramos reservas para os filtros selecionados.
          Tente alterar sua busca ou explorar nossos veículos.
        </p>

        <div className="reservas-empty-actions">
          <button
            type="button"
            className="reservas-limpar-btn"
            onClick={() => {
              setBusca('')
              setStatusFiltro('todas')
            }}
          >
            Limpar filtros
          </button>

          <Link to="/carros" className="reservas-explorar-btn">
            Explorar veículos
          </Link>
        </div>
      </div>
    ) : (
      <div className="reservas-lista">
        {reservasFiltradas.map((reserva) => (
          <article key={reserva.id} className="reserva-card">
            <div className="reserva-card-header">
              <div className="reserva-identificacao">
                <div className="reserva-carro-icon" aria-hidden="true">
                  🚘
                </div>

                <div>
                  <span className="reserva-card-label">
                    RESERVA #{reserva.id}
                  </span>
                  <h3>Carro #{reserva.carro_id}</h3>
                  <p className="reserva-card-subtitle">
                    Sua próxima experiência começa aqui.
                  </p>
                </div>
              </div>

              <span
                className={`reserva-status status-${reserva.status.toLowerCase()}`}
              >
                <span className="reserva-status-dot" />
                {formatarStatus(reserva.status)}
              </span>
            </div>

            <div className="reserva-card-datas">
              <div className="reserva-data-item">
                <span className="reserva-data-label">
                  <span aria-hidden="true">↗</span> RETIRADA
                </span>
                <strong>{formatarData(reserva.dataInicio)}</strong>
              </div>

              <div className="reserva-data-conector" aria-hidden="true">
                <span />
                <span>→</span>
                <span />
              </div>

              <div className="reserva-data-item">
                <span className="reserva-data-label">
                  <span aria-hidden="true">↙</span> DEVOLUÇÃO
                </span>
                <strong>{formatarData(reserva.dataFim)}</strong>
              </div>
            </div>

            <footer className="reserva-card-footer">
              <div className="reserva-valor-info">
                <span>Valor total da locação</span>
                <strong className="reserva-valor">
                  {reserva.valorTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
              </div>

              <span className="reserva-card-id">
                Código #{reserva.id}
              </span>
            </footer>
          </article>
        ))}
      </div>
    )}
  </section>
</main>

)
}

export default ReservasPage
