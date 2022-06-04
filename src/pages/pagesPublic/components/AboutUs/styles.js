import styled from 'styled-components';

export const Content = styled.div`
    display: flex;

    @media only screen and (max-width: 768px){
        flex-direction: column;
    }
`;

export const Text = styled.div`
    flex: 1;
    margin: 0 30px 30px 30px;
`;

export const Photo = styled.div`
    width: 350px;
    margin: 0 30px;

    img{
        width: 100%;
        box-shadow: 0px 5px 10px #333;
    }

    @media only screen and (max-width: 768px){
        width: 300px;
    }
`;
