import { ClimaInfo, ClimaCard } from './CLimaAtualSryled';
import { coresDeFundo } from './Estilos.jsx';

const CLimaAtual = ({ clima, unidade, converterTemperatura, converterVento }) => {
    if (!clima || !clima.weather || !clima.weather[0]) return null;

    const temperatura = clima.main;
    const climaPrincipal = clima.weather[0].main;
    const corFundo = coresDeFundo(climaPrincipal);

    const hora = new Date(clima.dt * 1000)
        .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const tempExibida = 
        unidade === 'C' 
            ? temperatura.temp 
            : converterTemperatura(temperatura.temp);

    const sensacaoExibida = 
        unidade === 'C'
            ? temperatura.feels_like
            : converterTemperatura(temperatura.feels_like);
    
    const simboloTemp = unidade === 'C' ? '°C' : '°F';
    
    const velocidadeVentoMS = clima.wind.speed;

    const velocidadeVentoExibida = 
        unidade === 'C'
            ? (velocidadeVentoMS * 3.6).toFixed(1) 
            : converterVento(velocidadeVentoMS);

    const simboloVento = unidade === 'C' ? 'km/h' : 'mph';


    return (
        <ClimaInfo>
            {clima.name && <h3>{clima.name}</h3>}

            <ClimaCard background={corFundo}>
                <p style={{ fontSize: '25px' }}><strong>{hora}</strong></p>
                <img 
                    src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
                    alt={clima.weather[0].description} 
                />
                
                <p style={{ fontSize: '20px' }}>
                    <strong>Temperatura: </strong>{tempExibida}{simboloTemp}
                </p>
                
                <p><strong>Clima:</strong> {clima.weather[0].description}</p>
                
                <p>
                    <strong>Sensação térmica: </strong>{sensacaoExibida}{simboloTemp}
                </p>
                
                <p><strong>Umidade do ar: </strong>{temperatura.humidity}%</p>
                
                <p>
                    <strong>Vento: </strong>{velocidadeVentoExibida} {simboloVento}
                </p>
            </ClimaCard>
        </ClimaInfo>
    );
};

export default CLimaAtual;