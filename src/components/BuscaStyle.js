import styled from "styled-components";

export const BuscaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
`;

export const BuscaCidade = styled.input`
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    width: 60%;
    margin-right: 10px;
    border: 2px solid black;
`;

export const BotaoBuscar = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
        cursor: pointer;
    }
`;
