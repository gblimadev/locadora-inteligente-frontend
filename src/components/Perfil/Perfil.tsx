import './Perfil.css';

function Perfil() {

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                <h1>Meu Perfil</h1>

                <div className="perfil-info">
                    <div className="campo">
                        <label>Nome</label>
                        <input type="text" placeholder="Nome completo" />
                    </div>
                </div>

                <div className="campo">
                    <label>CPF</label>
                    <input type= "text" placeholder="CPF" />
                </div>

                <div className="campo">
                    <label>Telefone</label>
                    <input type="text" placeholder="Telefone" />
                </div>

                <div className="campo"> 
                    <label>Data de nascimento</label>
                    <input type="date" /> 
                </div> 

                <button className="btn-salvar"> Salvar alterações 
                </button> 
    
            </div>
        </div>
    )
}

export default Perfil;