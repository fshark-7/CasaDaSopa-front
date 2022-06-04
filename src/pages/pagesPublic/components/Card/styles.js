import styled, { css } from 'styled-components';

const gradient = (degs) => css`
    background: linear-gradient(
      ${degs || 130}deg,

       ${({ theme }) => theme.colors.primary.lighter} 0%,
       ${({ theme }) => theme.colors.primary.main} 100%
    );
`;

export const CardContainer = styled.div`
    margin: 0 8px;
    position: relative;
    overflow: hidden;
    width: 300px;
    padding: 40px 0 40px;
    border-radius: 0.5rem;
    color: white;
    ${gradient()}
    box-shadow: 0 24px 38px rgba(0,0,0,0.025)
            0 9px 46px 8px rgba(0,0,0,0.025)
            0 11px 15px -7px rgba(0,0,0,0.025);

    @media only screen and (max-width: 768px){
        margin: 8px 0;
    }
`;

export const Content = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    flex: 0 0 auto;
    margin-bottom: 16px;
    border-radius: 50%;
    font-size: 40px;
    color: #FFF;
    ${gradient()}
    box-shadow: 0 11px 15px -7px rgba(0,0,0,0.25);

    img{
        width: 70%;
    }
`;

export const Title = styled.span`
    font-size: 24px;
    font-weight: 600;
`;
