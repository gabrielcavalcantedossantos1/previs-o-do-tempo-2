import { ClimaInfo } from './CLimaAtualSryled'
import { coresDeFundo } from './Estilos.jsx'

const CLimaAtual = ({ clima }) => {

  if (!clima || !clima.weather || !clima.weather[0]) return null;

  const temperatura = clima.main;
  const climaPrincipal = clima.weather[0].main;
  const corFundo = coresDeFundo(climaPrincipal);

  // Pegando o horário a partir do timestamp "dt"
  const hora = new Date(clima.dt * 1000)
    .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <ClimaInfo>
      {clima.name && (
        <h3 style={{ color: 'black' }}>{clima.name}</h3>
      )}

      <div
        style={{
          backgroundColor: corFundo,
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          transition: "0.3s",
          border: '2px solid black'
        }}
      >
        <p 
        style={{
          fontSize:'25px'
        }}><strong>{hora}</strong></p>

        <img 
          src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
          alt={clima.weather[0].description} 
        />

        <p
        style={{
          fontSize:"20px"
        }}><strong>Temperatura: </strong>{temperatura.temp}°C</p>
        <p><strong>Clima:</strong> {clima.weather[0].description}</p>
        <p><strong>Sensação térmica: </strong>{temperatura.feels_like}°C</p>
        <p><strong>Umidade do ar: </strong>{temperatura.humidity}%</p>
        <p><strong>Vento: </strong>{(clima.wind.speed * 3.6).toFixed(1)} km/h</p>
      </div>
    </ClimaInfo>
  );
};

export default CLimaAtual;
