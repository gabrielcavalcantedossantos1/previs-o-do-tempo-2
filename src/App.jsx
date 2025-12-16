import Busca from './components/Busca.jsx'
import CLimaAtual from './components/CLimaAtual.jsx'
import Previsao from './components/Previsao.jsx'
import BotaoUnidade from './components/BotaoUnidade.jsx'
import { useState, useEffect } from 'react'
import axios from "axios"

import { Titulo, CLimaContainer, ErroMensagem } from "./AppStyles.js"

const celsiusParaFahrenheit = (celsius) => {
  if (celsius === undefined || celsius === null) return null
  return (celsius * 1.8 + 32).toFixed(2)
}

const mpsParaMph = (mps) => {
  if (mps === undefined || mps === null) return null
  return (mps * 2.237).toFixed(1)
}

function obterCidadesSalvas() {
  try {
    const cidades = localStorage.getItem('cidadesFavoritas')
    return cidades ? JSON.parse(cidades) : []
  } catch {
    localStorage.removeItem('cidadesFavoritas')
    return []
  }
}

function salvarNovaCidade(novaCidade) {
  const cidades = obterCidadesSalvas()
  const jaExiste = cidades.some(
    c => c.lat === novaCidade.lat && c.lon === novaCidade.lon
  )
  if (jaExiste) return cidades

  const novaLista = [...cidades, novaCidade]
  localStorage.setItem('cidadesFavoritas', JSON.stringify(novaLista))
  return novaLista
}

function removerCidadeSalva(cidadeRemover) {
  const cidades = obterCidadesSalvas()
  const filtradas = cidades.filter(
    c => !(c.lat === cidadeRemover.lat && c.lon === cidadeRemover.lon)
  )
  localStorage.setItem('cidadesFavoritas', JSON.stringify(filtradas))
  return filtradas
}

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY || ''

  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [previsao, setPrevisao] = useState([])
  const [erro, setErro] = useState('')
  const [unidade, setUnidade] = useState('C')
  const [cidadesFavoritas, setCidadesFavoritas] = useState([])

  const carregarClimaPorCoordenadas = async (lat, lon) => {
    try {
      const climaAtual = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      const previsaoApi = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      setCidade(climaAtual.data.name)
      setClima(climaAtual.data)
      setPrevisao(previsaoApi.data.list.slice(0, 6))
      setErro('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErro('⚠️ Não foi possível carregar o clima ⚠️')
    }
  }

  const buscarClima = async () => {
    try {
      const climaAtual = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      const previsaoApi = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )

      setClima(climaAtual.data)
      setPrevisao(previsaoApi.data.list.slice(0, 6))
      setErro('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setClima(null)
      setPrevisao([])
      setErro('⚠️ Cidade não encontrada ⚠️')
    }
  }

  const handleTrocaUnidade = () => {
    const novaUnidade = unidade === 'C' ? 'F' : 'C'
    setUnidade(novaUnidade)
    localStorage.setItem('unidade', novaUnidade)
  }

  const handleAdicionarFavorito = () => {
    if (!clima) return

    const novaCidade = {
      nome: clima.name,
      lat: clima.coord.lat,
      lon: clima.coord.lon,
    }

    const lista = salvarNovaCidade(novaCidade)
    setCidadesFavoritas(lista)
  }

  const handleRemoverFavorito = (cidade, event) => {
    event.stopPropagation()
    const lista = removerCidadeSalva(cidade)
    setCidadesFavoritas(lista)
  }

  const handleCarregarFavorito = (cidade) => {
    carregarClimaPorCoordenadas(cidade.lat, cidade.lon)
  }

  const jaEhFavorita = clima &&
    cidadesFavoritas.some(
      c => c.lat === clima.coord.lat && c.lon === clima.coord.lon
    )

  useEffect(() => {
    setCidadesFavoritas(obterCidadesSalvas())

    const unidadeSalva = localStorage.getItem('unidade')
    if (unidadeSalva) setUnidade(unidadeSalva)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        carregarClimaPorCoordenadas(
          position.coords.latitude,
          position.coords.longitude
        )
      },
      () => setErro('Permissão de localização negada')
    )
  }, [])

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

      {clima && (
  <button
    onClick={handleAdicionarFavorito}
    disabled={jaEhFavorita}
    style={{
      margin: '12px 0',
      padding: '10px 16px',
      cursor: jaEhFavorita ? 'default' : 'pointer',
      backgroundColor: jaEhFavorita ? '#cfd8dc' : '#93d5f8',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#033649',
      opacity: jaEhFavorita ? 0.7 : 1
    }}
  >
    {jaEhFavorita
      ? '⭐ Cidade já salva'
      : `Salvar ${clima.name} como favorito`}
  </button>
)}



     {cidadesFavoritas.length > 0 && (
  <ul style={{ padding: 0, margin: '12px 0', listStyle: 'none' }}>
    {cidadesFavoritas.map(c => (
      <li
        key={c.lat + c.lon}
        onClick={() => handleCarregarFavorito(c)}
        style={{
          color:'#000',
          marginBottom: '8px',
          padding: '8px 12px',
          cursor: 'pointer',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>📍 {c.nome}</span>

        <button
          onClick={(e) => handleRemoverFavorito(c, e)}
          style={{
            marginLeft: '12px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
)}

      {clima && (
        <CLimaAtual
          clima={clima}
          unidade={unidade}
          converterTemperatura={celsiusParaFahrenheit}
          converterVento={mpsParaMph}
        />
      )}

      {previsao.length > 0 && (
        <Previsao
          previsoes={previsao}
          unidade={unidade}
          converterTemperatura={celsiusParaFahrenheit}
          converterVento={mpsParaMph}
        />
      )}
    </CLimaContainer>
  )
}

export default App
