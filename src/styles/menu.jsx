import styled from "styled-components";


export const Menu = styled.div`
    display: flex;
    border-bottom: 2px solid #303034;
    margin: 0;
    justify-content: center;
    & ul{
        display: flex;
        justify-content: center;
        width: 70%;
        gap: 20px;
        list-style: none;
        flex-wrap: wrap;
        & li{
            background-color: #303034;
            width: 110px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            & a{
                color: #ffffff;
            }
        }
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