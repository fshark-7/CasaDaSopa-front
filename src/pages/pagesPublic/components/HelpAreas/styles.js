import styled from 'styled-components';

export const Content = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 768px){
        flex-direction: column;
    }
`;
