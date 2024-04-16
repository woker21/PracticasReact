import styled from 'styled-components';

export const Box = styled.div`
    padding: 30px;
    color: white;
    background-color: ${({ $isVisible}) => $isVisible ? 'green' : 'blue'};
`;

export const Boton = styled.button`
    background-color: #c4eb3b;
    color: white;
`;
