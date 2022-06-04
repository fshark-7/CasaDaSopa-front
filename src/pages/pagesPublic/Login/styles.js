import styled from 'styled-components';
import bgLogin from '../../../assets/images/bgLogin.png';
import iconLogin from '../../../assets/images/iconLogin.png';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`;

export const Photo = styled.div`
    flex: 2;
    background: ${({ theme }) => theme.colors.primary.main};
    background-image: url(${bgLogin});
    background-size: cover;
    background-position: center;
    position: relative;
`;

export const Content = styled.div`
    flex: 1;

    max-width: 500px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    text-align: center;
    margin-top: 24px;

    h1{
        font-size: 32px;
        margin: 16px 0;
        letter-spacing: 4px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;

export const ImageLogin = styled.div`
    width: 100%;
    height: 150px;
    background-image: url(${iconLogin});
    background-size: cover;
    background-position: center;
    position: relative;
`;

export const Areabtn = styled.div`
    margin-top: 20px;
    button{
        width: 100%;
    }
`;
