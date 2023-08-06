import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    @media (max-width: 1080px) {
        font-size: 93.75%
    }

    @media (max-width: 720) {
        font-size: 87.5%
    }

    body{
        background: #87CEFA;
    }

    #root {
        /* max-width: 960px;
        margin: 0 auto;
        padding: 2.5rem 1.25rem; */
    }

    button {
        cursor: pointer;
    }

    a{
        color: inherit;
        text-decoration: none;
    }
}
`;
