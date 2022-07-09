import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    max-width: 1100px;
    margin: auto;
`;

export const Header = styled.div`
    text-align: center;
    margin-top: 20px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[200]};
    padding: 20px;

    h2{
        font-weight: 500;
    }
`;

export const Content = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    position: relative;
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
    position: absolute;
`;

export const FooterCard = styled.div`
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 8px;
    left: 0;
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray[300]};
    font-weight: 500;
    transition: 0.2s color ease-in;
    &:hover{
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;
