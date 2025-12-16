// /src/components/BotaoUnidade.jsx

import React from 'react';
// Importe seu componente de estilo ou use o estilo inline
import styled from 'styled-components'; 

const BotaoFAB = styled.button`
  position: fixed; /* Fixa na tela */
  bottom: 20px;    /* 20px da borda inferior */
  right: 20px;     /* 20px da borda direita */
  z-index: 1000;   /* Garante que fique acima de outros elementos */
  padding: 10px 15px;
  border-radius: 50px;
  background-color: #3f51b5; /* Cor primária */
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