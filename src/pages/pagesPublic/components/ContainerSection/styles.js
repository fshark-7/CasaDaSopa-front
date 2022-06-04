import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    padding: 50px 0;
    background: ${({ theme, bg }) => (bg ? theme.colors.gray[100] : '')};

`;

export const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
`;
