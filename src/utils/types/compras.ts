import { OculosI } from "./oculos"
import { ClienteI } from "./clientes"

export interface CompraI {
  id: number
  clienteId: string
  cliente: ClienteI
  OculosId: number
  oculos: OculosI
  endereco: string
  createdAt: string
  updatedAt: string | null
}