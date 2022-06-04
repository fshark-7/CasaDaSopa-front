import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    margin-top: 32px;
    width: 100%;
`;

export const TableContent = styled.div`
    margin-top: 24px;
`;

export const HeaderDependent = styled.div`
    text-align: center;
    padding-bottom:  20px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};
`;
