import styled from 'styled-components';

export const ClimaInfo = styled.div`
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

export const ClimaCard = styled.div`
  background-color: ${(props) => props.background};
  padding: 20px;
  border-radius: 12px;
  color: white;
  border: 2px solid black;
  margin: 0 auto;
  max-width: 220px;
  transition: 0.3s;

  @media (max-width: 500px) {
    max-width: 90%; 
  }
`;
