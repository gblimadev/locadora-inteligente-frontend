import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function Home() {

    const navigate = useNavigate();

    function sair() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="home">

            <header className="home-header">

                <h1>LOCADORA</h1>

                <nav>
                    <button onClick={() => navigate('/')}>
                        Início
                    </button>

                    <button onClick={() => navigate('/carros')}>
                        Carros
                    </button>

                    <button onClick={() => navigate('/reservas')}>
                        Minhas Reservas
                    </button>

                    <button className="logout-button" onClick={sair}>
                        Sair
                    </button>
                </nav>

            </header>

            <main className="home-content">

                <section className="welcome">

                    <h2>Bem-vindo à Locadora</h2>

                    <p>
                        Encontre o carro ideal para você e faça sua reserva
                        de forma rápida e simples.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() => navigate('/carros')}
                    >
                        Ver carros disponíveis
                    </button>

                </section>

                <section className="home-cards">

                    <div className="home-card">
                        <div className="card-icon">
                            🚗
                        </div>

                        <div className="card-content">
                            <h3>Encontre seu carro</h3>

                            <p>
                                Explore nossa frota e encontre o veículo ideal
                                para sua próxima viagem.
                            </p>

                            <button onClick={() => navigate('/carros')}>
                                Explorar carros
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                    <div className="home-card">
                        <div className="card-icon">
                            📋
                        </div>

                        <div className="card-content">
                            <h3>Minhas reservas</h3>

                            <p>
                                Acompanhe suas reservas, consulte detalhes e
                                veja o status dos seus aluguéis.
                            </p>

                            <button onClick={() => navigate('/reservas')}>
                                Ver minhas reservas
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                </section>

            </main>

        </div>
    )
}

export default Home;