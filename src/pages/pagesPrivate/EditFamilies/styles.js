import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const TabContainer = styled.div`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    align-items: center;
`;

export const TabProdHead = styled.div`
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: space-around;
    background: ${({ theme }) => theme.colors.gray[100]};
`;

export const Tab = styled.div`
    flex: 1;
    padding: 8px;
    text-align: center;
    color: ${(props) => props.theme.colors.primary.main};
    h4{
        font-size: 18px;
    }
    cursor: pointer;


    border-top: 2px solid ${({ theme }) => theme.colors.gray[100]};
    &.active {
        background: ${({ theme }) => theme.colors.gray[100]};
        border-top: 2px solid ${(props) => props.theme.colors.primary.main};
    }
    &.left{
        border-left: 2px solid ${({ theme }) => theme.colors.gray[100]};
    }
    &.right{
        border-right: 2px solid ${({ theme }) => theme.colors.gray[100]};
    }

    &.active.left{
        border-left: 2px solid ${(props) => props.theme.colors.primary.main};
    }
    &.active.right{
        border-right: 2px solid ${(props) => props.theme.colors.primary.main};
    }

`;

export const TabProdBody = styled.div`
 background: ${({ theme }) => theme.colors.gray[100]};
    width: 100%;
    position: relative;

    padding-bottom: 16px;

    @media only screen and (min-width: 575px){

        padding: 24px;
        margin: 0 30px 10px 30px;
    }
`;

export const TabContent = styled.div`
    display: none;
    &.active{
        display: block;
    }
`;
