// App.jsx
import './AppStyles.js'
import Busca from './components/Busca.jsx'
import CLimaAtual from './components/CLimaAtual.jsx'
import Previsao from './components/Previsao.jsx'
import { useState, useEffect } from 'react'
import axios from "axios"

import { Titulo, CLimaContainer, ErroMensagem } from "./AppStyles.js"

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY || ''

  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [previsao, setPrevisao] = useState([])
  const [erro, setErro] = useState('')

  // BUSCA AUTOMÁTICA POR GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      try {
        const respostaClimaAtual = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )

        const respostaPrevisao = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )

        setCidade(respostaClimaAtual.data.name)
        setClima(respostaClimaAtual.data)
        setPrevisao(respostaPrevisao.data.list.slice(0, 6))
        
      } catch (error) {
        console.log("Erro ao buscar dados iniciais: ", error)
      }
    })
  }, [apiKey])

  // BUSCA AO DIGITAR CIDADE
  const buscarClima = async () => {
    try {
      const respostaClimaAtual = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      const respostaPrevisao = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      setClima(respostaClimaAtual.data)
      setPrevisao(respostaPrevisao.data.list.slice(0, 6))
      setErro('')

      // Scroll suave para o topo ao buscar
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
      setClima(null)
      setPrevisao([])
      setErro('Cidade não encontrada')
    }
  }

  return (
    <CLimaContainer>
      <Titulo>Condições Climáticas</Titulo>
      <Busca 
        cidade={cidade}
        setCidade={setCidade}
        buscarClima={buscarClima}
      />

      {erro && <ErroMensagem>{erro}</ErroMensagem>}

      {clima && <CLimaAtual clima={clima} />}
      {previsao.length > 0 && <Previsao previsoes={previsao} />}
    </CLimaContainer>
  )
}

export default App
