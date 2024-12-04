import { AdminI } from "./admins"
import { MarcaI } from "./marcas"

export interface OculosI {
  id: number
  preco: number
  destaque: boolean
  foto: string
  formato: string
  material: string
  genero: string
  descricao: string
  marca: MarcaI
  marcaId: number
  modelo: string
  admin: AdminI
}