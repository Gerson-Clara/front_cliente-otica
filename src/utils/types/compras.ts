import { OculosI } from "./oculos";

export interface CompraI {
    id: number
    clienteId: string
    oculosId: number
    oculos: OculosI
    endereco: string
    resposta: string | null
    createdAt: string
    updatedAt: string | null
}