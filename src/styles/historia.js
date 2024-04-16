import styled, { createGlobalStyle } from 'styled-components';

export const Scene = styled.div`
    width: ${({ width }) => width}px;
    height:${({ height }) => height}px;
    background-image:url(${({ back }) => back});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: black;
    position: relative;
    margin:auto;
`;

export const Txt = styled.div`
    background-color: white;
    border-radius: 10px;
    padding:7px;
    border: 2px solid gray;
    box-shadow: 3px 3px 3px black;
    z-index: 2;
    position:absolute;
    left: ${({ x }) => x}%;
    top:3px;
`;


export const Door = styled.div`
    position: absolute;
    left: ${({ data }) => data.x}%;
    top: ${({ data }) => data.y}%;
    width: ${({ data }) => data.width}%;
    height: ${({ data }) => data.height}%;
    border: 1px solid red;
    cursor: pointer;
`;

export const GlobalStyle = createGlobalStyle`
	body {
		margin:0;
        background-color: black;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:15px;
        box-sizing: border-box;
	}
`;