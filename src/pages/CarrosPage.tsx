import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CarrosPage.css'

interface Carro {
    id: number
    marca: string
    modelo: string
    ano: number
    tipo: string
    combustivel: string
    cambio: string
    nivelDesempenho: string
    nivelEconomia: string
    nivelConforto: string
    lugares: number
    portaMalas: number
    precoDiaria: number
    disponivel: boolean
}

function CarrosPage() {

    const [carros, setCarros] = useState<Carro[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const navigate = useNavigate()

    async function buscarCarros() {

        try {

            setCarregando(true)
            setErro('')

            const resposta = await fetch(
                'http://localhost:8080/carros'
            )

            if (!resposta.ok) {
                throw new Error('Erro ao buscar carros')
            }

            const dados: Carro[] = await resposta.json()

            const carrosDisponiveis = dados.filter(
                carro => carro.disponivel === true
            )

            setCarros(carrosDisponiveis)

        } catch (error) {

            console.error('Erro ao buscar carros:', error)

            setErro(
                'Não foi possível carregar os carros.'
            )

        } finally {

            setCarregando(false)

        }
    }

    useEffect(() => {
        buscarCarros()
    }, [])

    function sair() {
        localStorage.removeItem('token')
        navigate('/')
    }

    function formatarPreco(preco: number) {
        return preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    function alugarCarro(id: number) {
        navigate(`/reservas?carroId=${id}`)
    }

    return (
        <div className="carros-page">

            <header className="carros-header">

                <div
                    className="brand"
                    onClick={() => navigate('/home')}
                >
                    <span className="brand-icon">
                        L
                    </span>

                    <span>
                        LOCADORA
                        <strong>.</strong>
                    </span>
                </div>

                <nav>

                    <button onClick={() => navigate('/home')}>
                        Início
                    </button>

                    <button className="active">
                        Carros
                    </button>

                    <button onClick={() => navigate('/reservas')}>
                        Minhas Reservas
                    </button>

                    <button onClick={() => navigate('/perfil')}>
                        Perfil
                    </button>

                    <button
                        className="logout-button"
                        onClick={sair}
                    >
                        Sair
                    </button>

                </nav>

            </header>

            <main className="carros-content">

                <section className="carros-hero">

                    <div className="hero-content">

                        <span className="hero-tag">
                            FROTA DISPONÍVEL
                        </span>

                        <h1>
                            Encontre o carro
                            <span> ideal para você.</span>
                        </h1>

                        <p>
                            Escolha entre veículos selecionados
                            para oferecer conforto, desempenho
                            e praticidade em cada viagem.
                        </p>

                    </div>

                    <div className="hero-decoration">
                        <div className="decoration-circle"></div>
                        <div className="decoration-line"></div>
                    </div>

                </section>

                <section className="carros-section">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                NOSSA FROTA
                            </span>

                            <h2>
                                Carros disponíveis
                            </h2>

                        </div>

                        {!carregando && !erro && (
                            <span className="car-count">

                                {carros.length}{' '}

                                {carros.length === 1
                                    ? 'veículo disponível'
                                    : 'veículos disponíveis'}

                            </span>
                        )}

                    </div>

                    {carregando && (

                        <div className="loading-container">

                            <div className="loading-spinner"></div>

                            <p>
                                Carregando nossa frota...
                            </p>

                        </div>

                    )}

                    {!carregando && erro && (

                        <div className="error-container">

                            <div className="error-icon">
                                !
                            </div>

                            <h3>
                                Não foi possível carregar os carros
                            </h3>

                            <p>
                                Verifique se o servidor está funcionando
                                e tente novamente.
                            </p>

                            <button onClick={buscarCarros}>
                                Tentar novamente
                            </button>

                        </div>

                    )}

                    {!carregando &&
                        !erro &&
                        carros.length === 0 && (

                            <div className="empty-container">

                                <div className="empty-icon">
                                    🚗
                                </div>

                                <h3>
                                    Nenhum carro disponível
                                </h3>

                                <p>
                                    No momento não temos veículos
                                    disponíveis para locação.
                                </p>

                            </div>

                        )}

                    {!carregando &&
                        !erro &&
                        carros.length > 0 && (

                            <div className="carros-grid">

                                {carros.map((carro, index) => (

                                    <article
                                        className="car-card"
                                        key={carro.id}
                                        style={{
                                            animationDelay:
                                                `${index * 0.08}s`
                                        }}
                                    >

                                        <div className="car-card-top">

                                            <span className="available-badge">

                                                <span className="available-dot"></span>

                                                Disponível

                                            </span>

                                            <span className="car-year">
                                                {carro.ano}
                                            </span>

                                        </div>

                                        <div className="car-image-container">

                                            <div className="car-glow"></div>

                                            <div className="car-placeholder">

                                                <span>
                                                    {carro.marca}
                                                </span>

                                                <strong>
                                                    {carro.modelo}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="car-info">

                                            <span className="car-brand">
                                                {carro.marca}
                                            </span>

                                            <h3>
                                                {carro.modelo}
                                            </h3>

                                            <span className="car-type">
                                                {carro.tipo}
                                            </span>

                                        </div>

                                        <div className="car-specs">

                                            <div className="spec">
                                                <span className="spec-icon">
                                                    ⚙
                                                </span>

                                                <div>
                                                    <small>Câmbio</small>
                                                    <strong>
                                                        {carro.cambio}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="spec">
                                                <span className="spec-icon">
                                                    ⛽
                                                </span>

                                                <div>
                                                    <small>Combustível</small>
                                                    <strong>
                                                        {carro.combustivel}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="spec">
                                                <span className="spec-icon">
                                                    👤
                                                </span>

                                                <div>
                                                    <small>Lugares</small>
                                                    <strong>
                                                        {carro.lugares}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="spec">
                                                <span className="spec-icon">
                                                    🧳
                                                </span>

                                                <div>
                                                    <small>Porta-malas</small>
                                                    <strong>
                                                        {carro.portaMalas} L
                                                    </strong>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="car-highlights">

                                            <span>
                                                {carro.nivelDesempenho}
                                            </span>

                                            <span>
                                                {carro.nivelEconomia}
                                            </span>

                                            <span>
                                                Conforto {carro.nivelConforto}
                                            </span>

                                        </div>

                                        <div className="car-footer">

                                            <div className="price">

                                                <small>
                                                    Diária a partir de
                                                </small>

                                                <strong>
                                                    {formatarPreco(
                                                        carro.precoDiaria
                                                    )}
                                                </strong>

                                            </div>

                                            <button
                                                className="rent-button"
                                                onClick={() =>
                                                    alugarCarro(carro.id)
                                                }
                                            >
                                                Alugar
                                                <span>→</span>
                                            </button>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                </section>

            </main>

        </div>
    )
}

export default CarrosPage