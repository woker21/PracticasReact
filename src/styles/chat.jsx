import styled,{ css } from "styled-components"



export const Chats = styled.div`
    background-color: #303034;
    padding: 20px 75px 20px 75px;
    border-radius: 20px;
    margin-top: 30px;
    position: relative;
    width: 46rem;
    margin-bottom: 5rem;

    & h2 {
        font-size: 18px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 10px;

            ${({ isCurrentUser }) =>
                isCurrentUser &&
                css`
                    text-align: right;
                `}

            span {
                color: #ffffff;
                
                padding: 8px 12px;
                border-radius: 20px;
            }
        }
    }
`;