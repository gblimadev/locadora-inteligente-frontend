import type { Reserva } from '../types/Reserva'

export const reservasMock: Reserva[] = [
  {
    id: 1,
    dataInicio: '2026-11-10',
    dataFim: '2026-11-15',
    valorTotal: 1250,
    status: 'CONFIRMADA',
    usuario_id: 1,
    carro_id: 1,
  },
  {
    id: 2,
    dataInicio: '2026-12-02',
    dataFim: '2026-12-05',
    valorTotal: 780,
    status: 'PENDENTE',
    usuario_id: 1,
    carro_id: 2,
  },
  {
    id: 3,
    dataInicio: '2026-08-10',
    dataFim: '2026-08-12',
    valorTotal: 460,
    status: 'FINALIZADA',
    usuario_id: 1,
    carro_id: 3,
  },
]