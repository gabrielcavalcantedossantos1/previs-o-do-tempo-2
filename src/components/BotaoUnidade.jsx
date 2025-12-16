import styled from 'styled-components'; 

const BotaoFAB = styled.button`
  position: fixed; 
  bottom: 20px;    
  right: 20px;    
  z-index: 1000;   
  padding: 10px 15px;
  border-radius: 50px;
  background-color: #3f51b5; 
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #303f9f;
  }
`;

const BotaoUnidade = ({ handleTroca, unidadeAtual }) => {
  
  const proximaUnidade = unidadeAtual === 'C' ? '°F' : '°C';
  
  return (
    <BotaoFAB onClick={handleTroca}>
      Mudar para {proximaUnidade}
    </BotaoFAB>
  );
};

export default BotaoUnidade;