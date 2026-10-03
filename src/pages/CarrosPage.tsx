import { useEffect, useState } from "react";
import "./CarrosPage.css";

interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  tipo: string;
  combustivel: string;
  disponivel: boolean;
}

function CarrosPage() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarCarros = async () => {
      try {
        const response = await fetch("http://localhost:8080/carros");

        if (!response.ok) {
          throw new Error("Não foi possível carregar os carros.");
        }

        const dados = await response.json();
        setCarros(dados);
      } catch (error) {
        setErro("Erro ao carregar os carros.");
      } finally {
        setLoading(false);
      }
    };

    buscarCarros();
  }, []);

  if (loading) {
    return (
      <div className="carros-page">
        <div className="carros-loading">
          <div className="spinner"></div>
          <p>Carregando carros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carros-page">
      <div className="carros-container">
        <div className="carros-header">
          <div>
            <span className="carros-subtitle">LOCADORA INTELIGENTE</span>
            <h1>Encontre seu carro</h1>
            <p>
              Escolha o carro ideal para sua próxima experiência.
            </p>
          </div>
        </div>

        {erro && <div className="carros-erro">{erro}</div>}

        {!erro && carros.length === 0 && (
          <div className="carros-vazio">
            <h2>Nenhum carro encontrado</h2>
            <p>No momento não existem carros disponíveis.</p>
          </div>
        )}

        <div className="carros-grid">
          {carros.map((carro) => (
            <div className="carro-card" key={carro.id}>
              <div className="carro-imagem">
                <span>🚗</span>

                <span
                  className={
                    carro.disponivel
                      ? "status disponivel"
                      : "status indisponivel"
                  }
                >
                  {carro.disponivel ? "Disponível" : "Indisponível"}
                </span>
              </div>

              <div className="carro-info">
                <span className="carro-tipo">{carro.tipo}</span>

                <h2>
                  {carro.marca} {carro.modelo}
                </h2>

                <div className="carro-detalhes">
                  <span>📅 {carro.ano}</span>
                  <span>⛽ {carro.combustivel}</span>
                </div>

                <button
                  className="btn-reservar"
                  disabled={!carro.disponivel}
                >
                  {carro.disponivel
                    ? "Reservar carro"
                    : "Indisponível"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarrosPage;