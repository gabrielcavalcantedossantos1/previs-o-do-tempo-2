import { 
  PrevisaoContainer,
  ItemPrevisao,
  Detalhes,
  Botao
} from "./Previsao.js";  

import { coresDeFundo } from './Estilos.jsx';
import { useState } from "react";

// ⬅️ ATUALIZADO: Recebendo todas as props necessárias
const Previsao = ({ previsoes, unidade, converterTemperatura, converterVento }) => { 
  const [detalheAberto, setDetalheAberto] = useState(null);

  if (!previsoes || previsoes.length === 0) return null;
  
  const climaPrincipal = previsoes[0]?.weather[0].main;
  
  // ⬅️ ATUALIZADO: Usando $background para evitar o erro do styled-components
  const corFundo = coresDeFundo(climaPrincipal); 

  // Definição dos Símbolos
  const simboloTemp = unidade === 'C' ? '°C' : '°F';
  const simboloVento = unidade === 'C' ? 'km/h' : 'mph';

  return (
    <PrevisaoContainer>
      <h4>Previsão para as próximas horas</h4>
      <ul>
        {previsoes.map((previsao) => {
          const clima = previsao.weather[0];
          const hora = previsao.dt_txt.split(" ")[1].slice(0, 5);
          const aberto = detalheAberto === previsao.dt;

          // ----------------------------------------------------------------------
          // ✨ LÓGICA DE CONVERSÃO PARA CADA ITEM DA PREVISÃO ✨

          // 1. Temperatura
          const tempExibida = 
              unidade === 'C' 
                  ? previsao.main.temp 
                  : converterTemperatura(previsao.main.temp);

          // 2. Sensação Térmica
          const sensacaoExibida = 
              unidade === 'C'
                  ? previsao.main.feels_like
                  : converterTemperatura(previsao.main.feels_like);

          // 3. Vento
          const velocidadeVentoMS = previsao.wind.speed;
          const velocidadeVentoExibida = 
              unidade === 'C'
                  ? (velocidadeVentoMS * 3.6).toFixed(1) // Seu cálculo original: m/s para km/h
                  : converterVento(velocidadeVentoMS);  // Agora, usa a função passada para m/s para mph
          // ----------------------------------------------------------------------

          return (
            <div key={previsao.dt}>
              
              {/* ⬅️ CORREÇÃO: Usando $background no styled-components */}
              <ItemPrevisao $background={corFundo}
              style={{
                minWidth:'28vh',
                margin:'0 20px'
              }}>
                <p><strong>{hora}</strong></p>

                <img
                  src={`http://openweathermap.org/img/wn/${clima.icon}.png`}
                  alt={clima.description}
                />

                {/* EXIBINDO TEMPERATURA CONVERTIDA */}
                <p><strong>Temperatura: </strong>{tempExibida} {simboloTemp}</p>
              </ItemPrevisao>

              {!aberto && (
                <Botao onClick={() => setDetalheAberto(previsao.dt)}>
                  Ver detalhes
                </Botao>
              )}

              {aberto && (
                <Detalhes>
                  <p><strong>Clima:</strong> {clima.description}</p>
                  
                  {/* EXIBINDO SENSAÇÃO TÉRMICA CONVERTIDA */}
                  <p><strong>Sensação térmica:</strong> {sensacaoExibida} {simboloTemp}</p>
                  
                  <p><strong>Umidade:</strong> {previsao.main.humidity}%</p>
                  
                  {/* EXIBINDO VENTO CONVERTIDO */}
                  <p><strong>Vento:</strong> {velocidadeVentoExibida} {simboloVento}</p>

                  <Botao onClick={() => setDetalheAberto(null)}>
                    Fechar detalhes
                  </Botao>
                </Detalhes>
              )}

            </div>
          );
        })}
      </ul>
    </PrevisaoContainer>
  );
};

export default Previsao;