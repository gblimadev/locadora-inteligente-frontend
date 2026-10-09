export type StatusReserva =
| 'PENDENTE'
| 'CONFIRMADA'
| 'EM_ANDAMENTO'
| 'FINALIZADA'
| 'CANCELADA'

export interface Reserva {
id: number
dataInicio: string
dataFim: string
valorTotal: number
status: StatusReserva
usuario_id: number
carro_id: number
}
