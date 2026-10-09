
export interface Carro {
  id: number
  marca: string
  modelo: string
  ano: number
  categoria: string
  transmissao: 'Manual' | 'Automática'
  combustivel: string
  passageiros: number
  valorDiaria: number
  imagem: string
  disponivel: boolean
}
