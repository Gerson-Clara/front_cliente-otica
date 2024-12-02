'use client'
import './page.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useClienteStore } from '@/context/cliente';
import { CompraI } from "@/utils/types/compras";

export default function Compras() {
  const [compras, setcompras] = useState<CompraI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/compras/${cliente.id}`)
      const dados = await response.json()
      setcompras(dados)
    }
    buscaDados()
  }, [])

  // para retornar apenas a data do campo no banco de dados
  // 2024-10-10T22:46:27.227Z => 10/10/2024
  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const comprasTable = compras.map(compra => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={compra.id} >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {compra.oculos.formato}
      </th>
      <td className="px-6 py-4">
        {compra.oculos.modelo}
      </td>
      <td className="px-6 py-4">
        <img src={compra.oculos.foto} className="fotoOculos" alt="Foto do oculos" />
      </td>
      <td className="px-6 py-4">
        <p><b>{compra.endereco}</b></p>
        <p><i>Comprado em: {dataDMA(compra.createdAt)}</i></p>
      </td>
    </tr>
  ))

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Minhas compras</span></h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Formato
            </th>
            <th scope="col" className="px-6 py-3">
              Modelo
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              compra
            </th>
          </tr>
        </thead>
        <tbody>
          {comprasTable}
        </tbody>
      </table>
    </section>
  )
}