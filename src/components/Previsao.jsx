import { 
  PrevisaoContainer,
  ItemPrevisao,
  Detalhes,
  Botao
} from "./Previsao.js";  

import { coresDeFundo } from './Estilos.jsx';
import { useState } from "react";

const Previsao = ({ previsoes }) => {
  const [detalheAberto, setDetalheAberto] = useState(null);

  const climaPrincipal = previsoes[0]?.weather[0].main;
  const corFundo = coresDeFundo(climaPrincipal);

  return (
    <PrevisaoContainer>
      <h4>Previsão para as próximas horas</h4>
      <ul>
        {previsoes.map((previsao) => {
          const clima = previsao.weather[0];
          const hora = previsao.dt_txt.split(" ")[1].slice(0, 5);
          const aberto = detalheAberto === previsao.dt;

          return (
            <div key={previsao.dt}>
              
              <ItemPrevisao background={corFundo}>
                <p><strong>{hora}</strong></p>

                <img
                  src={`http://openweathermap.org/img/wn/${clima.icon}.png`}
                  alt={clima.description}
                />

                {previsao.main.temp} °C
              </ItemPrevisao>

              {!aberto && (
                <Botao onClick={() => setDetalheAberto(previsao.dt)}>
                  Ver detalhes
                </Botao>
              )}

              {aberto && (
                <Detalhes>
                  <p><strong>Clima:</strong> {clima.description}</p>
                  <p><strong>Sensação térmica:</strong> {previsao.main.feels_like} °C</p>
                  <p><strong>Umidade:</strong> {previsao.main.humidity}%</p>
                  <p><strong>Vento:</strong> {(previsao.wind.speed * 3.6).toFixed(1)} km/h</p>

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
