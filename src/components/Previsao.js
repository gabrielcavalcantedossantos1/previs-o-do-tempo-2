import styled from "styled-components";

export const PrevisaoContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  border: 2px solid black;

  h4 {
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
  }
`;

/* Estilo de cada card da previsão */
export const ItemPrevisao = styled.li`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background: ${(props) => props.background};
  padding: 10px;
  border-radius: 12px;
  border: 2px solid black;
  width: 120px;
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
  }

  @media (max-width: 500px) {
    width: 90px;
  }
`;

/* Botões */
export const Botao = styled.button`
  border: 2px solid black;
  padding: 10px;
  margin-top: 6px;
  border-radius: 25px;
  background: white;

  &:hover {
    background: #e7e7e7;
    cursor: pointer;
  }
`;

/* Caixa de detalhes */
export const Detalhes = styled.div`
  background: #ffffff55;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;

  p {
    margin: 4px 0;
  }
`;
