import styled from 'styled-components';

export const Form = styled.form`
    width: 100%;
    max-width: 600px;
    margin: auto;

    @media only screen and (max-width: 480px){
        padding: 0 16px;
    }
`;

export const Box = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
    margin-bottom: 18px;
`;

export const ButtonContainer = styled.div`
    margin-top: 24px;
    button{
        width: 100%;
    }
`;
