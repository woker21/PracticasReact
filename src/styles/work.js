import styled, { css, createGlobalStyle } from 'styled-components';
import flecha from '../assets/img/flecha.png';

export const Row = styled.div`
    display: grid;
    grid-template-columns: 45% 45%;
`;

export const MainImg = styled.img`
    width: 100%;
`;
export const Img = styled.img`
    width: 100%;
    border-radius: 50px;
    ${({ active }) => active ? 'border: 4px solid purple; z-index:1' : 'border:4px solid transparent'}
`;


const Btn = css`
    display: inline-block;
    cursor: pointer;
    background-image: url(${flecha});
    background-size: 100% 100%;
    width: 30px;
    height: 30px;
`;

export const BtnLeft = styled.span`
    ${Btn}
    margin-right: 10px;
`;

export const BtnRight = styled.span`
    ${Btn}
    transform: rotate(180deg);
    margin-left: 10px;
`;

export const GlobalStyle = createGlobalStyle`
body{
    display: flex;
    align-items:center;
justify-content:center;

}


`