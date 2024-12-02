'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemOculos } from "@/components/ItemOculos";
import { OculosI } from "@/utils/types/oculos";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [oculos, setOculos] = useState<OculosI[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {

    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/oculos`)
      const dados = await response.json()
      // console.log(dados)
      setOculos(dados)
    }
    buscaDados()
  }, [])

  const listaOculos = oculos.map( oculos => (
    <ItemOculos data={oculos} key={oculos.id} />
  ))

  return (
    <main>
      <InputPesquisa setOculos={setOculos} />

      <section className="max-w-screen-xl mx-auto">
        <h1 className="mb-5 mt-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-black">Armações <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">em destaque</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaOculos}
        </div>

      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
