import styled from "styled-components";


export const Menu = styled.div`
    display: flex;
    
    & ul{
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 50px;
        list-style: none;
    }
`;


export const Cont = styled.div`
    justify-content: center;
    display: flex;

    & main{
        
    width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;

    }
`