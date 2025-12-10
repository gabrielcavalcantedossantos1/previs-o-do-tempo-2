import { PrevisaoContainer } from "./Previsao.js";
import { coresDeFundo } from './Estilos.jsx'

const Previsao = ({ previsoes }) => {

const climaPrincipal = previsoes[0]?.weather[0].main;
const corFundo = coresDeFundo(climaPrincipal);


  return (
    <PrevisaoContainer>
      <h4>Previsão para as próximas horas</h4>
      <ul>
        {previsoes.map((previsao) => {
          const clima = previsao.weather[0];

          return (
            <li 
              key={previsao.dt}
              style={{
                background:corFundo,
                borderRadius:'10px'
              }}
            >
              <img 
                src={`http://openweathermap.org/img/wn/${clima.icon}.png`} 
                alt={clima.description}
              />
              {previsao.main.temp} °C - {clima.description}
            </li>
          );
        })}
      </ul>
    </PrevisaoContainer>
  )
}

export default Previsao;
