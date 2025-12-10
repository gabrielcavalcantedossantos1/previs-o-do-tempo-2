import styled from 'styled-components'

export const PrevisaoContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);

  h4 {
    text-align: center;
    margin-bottom: 10px;
    color: #333;
  }

  ul {
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
  }

  ul li {
    display: flex;
    flex-direction: column; /* empilha imagem e texto */
    align-items: center;    /* centraliza horizontalmente */
    justify-content: center; /* centraliza verticalmente */
    text-align: center;     
    background: rgba(255,255,255,0.6);
    padding: 10px;
    border-radius: 12px;
    width: 120px;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    img {
      margin-bottom: 5px;
    }
  }

  /* Responsividade para telas pequenas */
  @media (max-width: 500px) {
    ul li {
      width: 90px;
      padding: 8px;
    }

    ul {
      gap: 10px;
    }
  }
`
