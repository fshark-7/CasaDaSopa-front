import styled from 'styled-components';

export const Container = styled.main`
    min-height: 100vh;
    width: 100%;
    max-width: 1100px;
    margin: auto;
`;

export const Header = styled.div`
    text-align: center;
    margin-top: 20px;
    h2{
        font-weight: 500;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    width: 400px;
    height: 180px;
    background: ${({ theme }) => theme.colors.gray[200]};
    margin: 8px;
    border-radius: 4px;
    padding: 8px;
    box-shadow: 0px 1px 5px #333;
`;

export const Title = styled.div`
    width: 100%;
    height: 30px;
    padding-bottom: 8px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
    strong{
        font-weight: 500;
    }
`;

export const Description = styled.div`
    height: 350px;
    padding-top: 8px;
`;

export const FooterCard = styled.div`
    background: aqua;
    height: 20px;
`;
