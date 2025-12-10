import { ClimaInfo } from './CLimaAtualSryled'
import { coresDeFundo } from './Estilos.jsx'

const CLimaAtual = ({ clima }) => {

  if (!clima) return null; // segurança

  const climaPrincipal = clima.weather[0].main;
  const corFundo = coresDeFundo(climaPrincipal);

  return (
    <ClimaInfo>
      <div
        style={{
          backgroundColor: corFundo,
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          transition: "0.3s"
        }}
      >
        <h3>{clima.name}</h3>
        <img 
          src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
          alt={clima.weather[0].description} 
        />
        <p>{clima.main.temp}°C</p>
        <p>{clima.weather[0].description}</p>
      </div>
    </ClimaInfo>
  );
};

export default CLimaAtual;
