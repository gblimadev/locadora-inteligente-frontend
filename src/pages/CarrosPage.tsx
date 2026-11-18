
import { useEffect, useState, type FormEvent } from 'react'
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

interface RecomendacaoCarro {
    dataInicio: string
    dataFim: string
    tipo: string
    modelo: string
    marca: string
    combustivel: string
    cambio: string
    nivelDesempenho: string
    nivelEconomia: string
    nivelConforto: string
}

function CarrosPage() {

    const [carros, setCarros] = useState<Carro[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    const [carregandoRecomendacao, setCarregandoRecomendacao] = useState(false)
    const [erroRecomendacao, setErroRecomendacao] = useState('')
    const [recomendacaoAtiva, setRecomendacaoAtiva] = useState(false)

    const [preferencias, setPreferencias] = useState<RecomendacaoCarro>({
        dataInicio: '',
        dataFim: '',
        tipo: '',
        modelo: '',
        marca: '',
        combustivel: '',
        cambio: '',
        nivelDesempenho: '',
        nivelEconomia: '',
        nivelConforto: ''
    })

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
            setRecomendacaoAtiva(false)

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

    function atualizarPreferencia(
        campo: keyof RecomendacaoCarro,
        valor: string
    ) {
        setPreferencias({
            ...preferencias,
            [campo]: valor
        })
    }

    async function recomendarCarros(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        try {

            setCarregandoRecomendacao(true)
            setErroRecomendacao('')

            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error(
                    'Você precisa estar autenticado para utilizar as recomendações.'
                )
            }

            const dadosRecomendacao = {
                dataInicio: preferencias.dataInicio,
                dataFim: preferencias.dataFim,
                tipo: preferencias.tipo || null,
                modelo: preferencias.modelo || null,
                marca: preferencias.marca || null,
                combustivel: preferencias.combustivel || null,
                cambio: preferencias.cambio || null,
                nivelDesempenho: preferencias.nivelDesempenho || null,
                nivelEconomia: preferencias.nivelEconomia || null,
                nivelConforto: preferencias.nivelConforto || null
            }

            const resposta = await fetch(
                'http://localhost:8080/carros/recomendar',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dadosRecomendacao)
                }
            )

            if (!resposta.ok) {

                if (resposta.status === 401 || resposta.status === 403) {
                    throw new Error(
                        'Sua sessão não é válida ou expirou. Faça login novamente.'
                    )
                }

                throw new Error(
                    'Não foi possível obter as recomendações dos veículos.'
                )
            }

            const dados: Carro[] = await resposta.json()

            setCarros(dados)
            setRecomendacaoAtiva(true)

        } catch (error) {

            console.error('Erro ao recomendar carros:', error)

            if (error instanceof Error) {
                setErroRecomendacao(error.message)
            } else {
                setErroRecomendacao(
                    'Ocorreu um erro ao buscar as recomendações.'
                )
            }

        } finally {

            setCarregandoRecomendacao(false)

        }
    }

    function limparRecomendacao() {

        setPreferencias({
            dataInicio: '',
            dataFim: '',
            tipo: '',
            modelo: '',
            marca: '',
            combustivel: '',
            cambio: '',
            nivelDesempenho: '',
            nivelEconomia: '',
            nivelConforto: ''
        })

        setErroRecomendacao('')
        buscarCarros()
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

                {/* RECOMENDAÇÃO INTELIGENTE */}

                <section className="recomendacao-section">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                ENCONTRE SEU VEÍCULO
                            </span>

                            <h2>
                                Recomendação Inteligente
                            </h2>

                            <p>
                                Informe suas preferências para encontrar
                                os veículos mais adequados para você.
                            </p>

                        </div>

                    </div>

                    <form
                        className="recomendacao-form"
                        onSubmit={recomendarCarros}
                    >

                        <div className="recomendacao-datas">

                            <div className="campo-recomendacao">

                                <label htmlFor="dataInicio">
                                    Data de retirada
                                </label>

                                <input
                                    id="dataInicio"
                                    type="date"
                                    value={preferencias.dataInicio}
                                    onChange={e =>
                                        atualizarPreferencia(
                                            'dataInicio',
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="dataFim">
                                    Data de devolução
                                </label>

                                <input
                                    id="dataFim"
                                    type="date"
                                    value={preferencias.dataFim}
                                    min={preferencias.dataInicio || undefined}
                                    onChange={e =>
                                        atualizarPreferencia(
                                            'dataFim',
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <div className="recomendacao-preferencias">

                            <div className="campo-recomendacao">

                                <label htmlFor="tipo">
                                    Tipo de veículo
                                </label>

                                <input
                                    id="tipo"
                                    type="text"
                                    placeholder="Ex.: SUV, Sedan, Hatch"
                                    value={preferencias.tipo}
                                    onChange={e =>
                                        atualizarPreferencia('tipo', e.target.value)
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="marca">
                                    Marca
                                </label>

                                <input
                                    id="marca"
                                    type="text"
                                    placeholder="Ex.: Toyota, Honda"
                                    value={preferencias.marca}
                                    onChange={e =>
                                        atualizarPreferencia('marca', e.target.value)
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="modelo">
                                    Modelo
                                </label>

                                <input
                                    id="modelo"
                                    type="text"
                                    placeholder="Ex.: Corolla, Civic"
                                    value={preferencias.modelo}
                                    onChange={e =>
                                        atualizarPreferencia('modelo', e.target.value)
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="combustivel">
                                    Combustível
                                </label>

                                <input
                                    id="combustivel"
                                    type="text"
                                    placeholder="Ex.: Flex, Diesel, Elétrico"
                                    value={preferencias.combustivel}
                                    onChange={e =>
                                        atualizarPreferencia('combustivel', e.target.value)
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="cambio">
                                    Câmbio
                                </label>

                                <input
                                    id="cambio"
                                    type="text"
                                    placeholder="Ex.: Automático, Manual"
                                    value={preferencias.cambio}
                                    onChange={e =>
                                        atualizarPreferencia('cambio', e.target.value)
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="nivelDesempenho">
                                    Desempenho
                                </label>

                                <input
                                    id="nivelDesempenho"
                                    type="text"
                                    placeholder="Informe o nível desejado"
                                    value={preferencias.nivelDesempenho}
                                    onChange={e =>
                                        atualizarPreferencia(
                                            'nivelDesempenho',
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="nivelEconomia">
                                    Economia
                                </label>

                                <input
                                    id="nivelEconomia"
                                    type="text"
                                    placeholder="Informe o nível desejado"
                                    value={preferencias.nivelEconomia}
                                    onChange={e =>
                                        atualizarPreferencia(
                                            'nivelEconomia',
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="campo-recomendacao">

                                <label htmlFor="nivelConforto">
                                    Conforto
                                </label>

                                <input
                                    id="nivelConforto"
                                    type="text"
                                    placeholder="Informe o nível desejado"
                                    value={preferencias.nivelConforto}
                                    onChange={e =>
                                        atualizarPreferencia(
                                            'nivelConforto',
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                        {erroRecomendacao && (

                            <p className="erro-recomendacao">
                                {erroRecomendacao}
                            </p>

                        )}

                        <div className="recomendacao-acoes">

                            <button
                                type="submit"
                                disabled={carregandoRecomendacao}
                            >
                                {carregandoRecomendacao
                                    ? 'Buscando recomendações...'
                                    : 'Encontrar meu carro'}
                            </button>

                            {recomendacaoAtiva && (

                                <button
                                    type="button"
                                    onClick={limparRecomendacao}
                                >
                                    Limpar recomendação
                                </button>

                            )}

                        </div>

                    </form>

                </section>

                <section className="carros-section">

                    <div className="section-header">

                        <div>

                            <span className="section-label">
                                NOSSA FROTA
                            </span>

                            <h2>
                                {recomendacaoAtiva
                                    ? 'Carros recomendados para você'
                                    : 'Carros disponíveis'}
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
