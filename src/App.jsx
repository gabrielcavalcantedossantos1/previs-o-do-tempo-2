// App.jsx
import './AppStyles.js'
import Busca from './components/Busca.jsx'
import CLimaAtual from './components/CLimaAtual.jsx'
import Previsao from './components/Previsao.jsx'
import BotaoUnidade from './components/BotaoUnidade.jsx'
import { useState, useEffect } from 'react'
import axios from "axios"

import { Titulo, CLimaContainer, ErroMensagem } from "./AppStyles.js"

// Funções de Conversão - Podemos colocá-las fora do componente para evitar recriação, mas aqui é um bom lugar por enquanto.
// --------------------------------------------------------------------------------------------------------------------

// 1. Temperatura: F = C * 1.8 + 32
const celsiusParaFahrenheit = (celsius) => {
  if (celsius === undefined || celsius === null) return null;
  // .toFixed(2) para manter duas casas decimais
  return (celsius * 1.8 + 32).toFixed(2); 
};

// 2. Vento: mph = m/s * 2.237 (OpenWeatherMap retorna em m/s na unidade 'metric')
const mpsParaMph = (mps) => {
  if (mps === undefined || mps === null) return null;
  return (mps * 2.237).toFixed(1);
};

// --------------------------------------------------------------------------------------------------------------------

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY || ''

  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [previsao, setPrevisao] = useState([])
  const [erro, setErro] = useState('')
  
  // NOVO ESTADO PARA A UNIDADE: 'C' (Celsius) ou 'F' (Fahrenheit)
  const [unidade, setUnidade] = useState('C') 

  // FUNÇÃO PARA TROCAR O ESTADO DA UNIDADE SEM CHAMAR A API
  const handleTrocaUnidade = () => {
    // Se for 'C', troca para 'F'; se for 'F', troca para 'C'
    setUnidade(unidade === 'C' ? 'F' : 'C');
  };


  // BUSCA AUTOMÁTICA POR GPS (PERMANECE COM units=metric)
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

      window.scrollTo({ top: 0, behavior: 'smooth' })
      
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
      setClima(null)
      setPrevisao([])
      setErro('⚠️ Cidade não encontrada ⚠️')
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
      
      <BotaoUnidade 
        handleTroca={handleTrocaUnidade} 
        unidadeAtual={unidade} 
      />

      {clima && 
        <CLimaAtual 
          clima={clima} 
          unidade={unidade} 
          converterTemperatura={celsiusParaFahrenheit}
          converterVento={mpsParaMph} 
        />}
        
      {/* ⬇️ TRECHO CORRIGIDO! ⬇️ */}
      {previsao.length > 0 && 
        <Previsao 
          previsoes={previsao} 
          unidade={unidade} 
          converterTemperatura={celsiusParaFahrenheit}
          converterVento={mpsParaMph} 
        />}
      {/* ⬆️ FIM DO TRECHO CORRIGIDO ⬆️ */}
    </CLimaContainer>
  )
}

export default App