import './AppStyles.js'
import Busca from './components/Busca.jsx'
import CLimaAtual from './components/CLimaAtual.jsx'
import Previsao from './components/Previsao.jsx'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Titulo, CLimaContainer, ErroMensagem } from "./AppStyles.js"

const App = () => {

  const apiKey = import.meta.env.VITE_API_KEY || ''

  const [cidade ,setCidade] = useState('')
  const [clima,setCLima] = useState(null)
  const [previsao,setprevisao] = useState([])
  const [erro, setErro] = useState('') 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      try {
        const resposta = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )
        setCidade(resposta.data.name)
        setCLima(resposta.data)
      } catch (error) {
        console.log("Erro ao buscar clima atual: ", error)
      }
    })
  }, [apiKey])

  const buscarClima = async () => {
    try{
      const respostaClima = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )
      const respostaPrevisao = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      setCLima(respostaClima.data)
      setprevisao(respostaPrevisao.data.list.slice(0, 5))
      setErro('')
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
      setCLima(null)
      setprevisao([])
      setErro('Cidade não encontrada')
    }
  }

  return (
    <CLimaContainer>
      <Titulo>Condições Climáticas</Titulo>
      <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima}/>

      {erro && <ErroMensagem>{erro}</ErroMensagem>} 

      {clima && <CLimaAtual clima={clima} />}
      {previsao.length > 0 && <Previsao previsoes={previsao}/>}
    </CLimaContainer>
  )
}

export default App
