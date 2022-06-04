import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    width: 100%;
    max-width: 500px;
    margin: auto;
    margin-bottom: 24px;

    h1{
        color: ${({ theme }) => theme.colors.primary.main};
        font-size: 24px;
    }
`;
