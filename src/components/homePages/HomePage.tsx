import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function Home() {

    const navigate = useNavigate()

    function sair() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="home">

            <header className="home-header">

                <div className="home-brand">

                    <div className="brand-mark">
                        L
                    </div>

                    <div className="brand-text">
                        <h1>LOCADORA</h1>
                        <span>SMART MOBILITY</span>
                    </div>

                </div>

                <nav className="home-nav">

                    <button
                        className="active"
                        onClick={() => navigate('/home')}
                    >
                        Início
                    </button>

                    <button
                        onClick={() => navigate('/carros')}
                    >
                        Carros
                    </button>

                    <button
                        onClick={() => navigate('/reservas')}
                    >
                        Minhas Reservas
                    </button>

                    <button
                        className="logout-button"
                        onClick={sair}
                    >
                        Sair
                    </button>

                </nav>

            </header>

            <main className="home-content">

                {/* HERO */}

                <section className="welcome">

                    <img
                        className="hero-image"
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6d/2020_Bugatti_Chiron_Sport_in_Nocturne_and_Atlantic_Blue%2C_front_left.jpg"
                        alt="Carro esportivo azul"
                    />

                    <div className="hero-overlay"></div>
                    <div className="hero-grid"></div>

                    <div className="welcome-content">

                        <div className="welcome-badge">
                            <span className="status-dot"></span>
                            MOBILIDADE INTELIGENTE
                        </div>

                        <h2>
                            Dirija o seu
                            <strong> próximo destino.</strong>
                        </h2>

                        <p>
                            Encontre veículos que combinam com seu estilo,
                            sua rotina e sua próxima aventura.
                        </p>

                        <div className="hero-actions">

                            <button
                                className="primary-button"
                                onClick={() => navigate('/carros')}
                            >
                                Explorar carros
                                <span>→</span>
                            </button>

                            <button
                                className="hero-link"
                                onClick={() => navigate('/reservas')}
                            >
                                Ver minhas reservas
                            </button>

                        </div>

                    </div>

                    <div className="hero-floating-card">

                        <span>
                            EXPERIÊNCIA
                        </span>

                        <strong>
                            PREMIUM
                        </strong>

                        <small>
                            Sua jornada começa aqui.
                        </small>

                    </div>

                </section>


                {/* INTRO */}

                <section className="section-intro">

                    <div>

                        <span className="section-tag">
                            POR QUE LOCADORA?
                        </span>

                        <h2>
                            Mais que um aluguel.
                            <span> Uma experiência.</span>
                        </h2>

                    </div>

                    <p>
                        Tecnologia, praticidade e uma frota preparada
                        para transformar cada viagem em uma experiência
                        simples e inteligente.
                    </p>

                </section>


                {/* CARDS */}

                <section className="home-cards">

                    <article
                        className="home-card"
                        onClick={() => navigate('/carros')}
                    >

                        <div className="card-image">

                            <img
                                src="https://streetglow.com/cdn/shop/files/Audi_RS7_Grey-_Blue_Underglow-_Large_Kit.png?v=1758825852&width=768"
                                alt="Audi RS7"
                            />

                            <div className="card-image-overlay"></div>

                            <span className="card-number">
                                01
                            </span>

                        </div>

                        <div className="card-content">

                            <span className="card-label">
                                FROTA
                            </span>

                            <h3>
                                Encontre seu carro
                            </h3>

                            <p>
                                Explore veículos modernos, econômicos,
                                confortáveis e esportivos.
                            </p>

                            <button>
                                Explorar carros
                                <span>→</span>
                            </button>

                        </div>

                    </article>


                    <article
                        className="home-card"
                        onClick={() => navigate('/reservas')}
                    >

                        <div className="card-image">

                            <img
                                src="https://img.goodfon.com/original/1920x1080/5/3a/rolls-royce-ghost-2021-black-badge-ghost-v12600-l-s-900-nm-n.jpg"
                                alt="Rolls-Royce Ghost"
                            />

                            <div className="card-image-overlay"></div>

                            <span className="card-number">
                                02
                            </span>

                        </div>

                        <div className="card-content">

                            <span className="card-label">
                                RESERVAS
                            </span>

                            <h3>
                                Sua próxima jornada
                            </h3>

                            <p>
                                Consulte suas reservas e acompanhe todos
                                os detalhes dos seus aluguéis.
                            </p>

                            <button>
                                Minhas reservas
                                <span>→</span>
                            </button>

                        </div>

                    </article>

                </section>


                {/* BANNER */}

                <section className="home-banner">

                    <div className="banner-content">

                        <span>
                            PRONTO PARA PARTIR?
                        </span>

                        <h2>
                            Escolha seu carro.
                            <br />
                            <strong>Viva a experiência.</strong>
                        </h2>

                        <button
                            onClick={() => navigate('/carros')}
                        >
                            Ver carros disponíveis
                            <span>→</span>
                        </button>

                    </div>

                    <div className="banner-glow"></div>

                </section>

            </main>

        </div>
    )
}

export default Home