import styled from "styled-components";

export const PrevisaoContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 5px;

  h4 {
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    display: grid;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    justify-items: center;
    justify-content: center;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 25px;
    }

    @media (max-width: 620px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`;

export const ItemPrevisao = styled.li`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${(props) => props.background};
  padding: 15px;
  border-radius: 12px;
  border: 2px solid black;
  width: 100%;
  max-width: 220px;
  min-height: 180px;
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
    max-width: 90%;
  }
`;

export const Detalhes = styled.div`
  background: #ffffff55;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
  width: 100%;
  max-width: 220px;

  p {
    margin: 4px 0;
  }

  @media (max-width: 500px) {
    max-width: 90%;
  }
`;

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
