import styled from 'styled-components';

export const Menu = styled.ul`
    height: 100%;
    background: ${({ theme }) => theme.colors.primary.main};
    list-style: none;
    >a li{
        display: flex;
        align-items: center;
        color: #FFF;
        padding: 10px 0;

        .ico{
            margin: 0 16px 0 8px;
            font-size: 24px;
        }
    }
    >a li:hover{
        background: black;
    }

`;

export const LogoutContent = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    bottom: 10px;
    margin-left: 5px;
    cursor: pointer;
    border: 2px solid #FFF;
    border-radius: 4px;
    padding: 4px;

    h3{
        font-size: 16px;
        margin-right: 16px;
    }

    &:hover{
        background: ${({ theme }) => theme.colors.primary.light};
    }
    color: #fff;
`;
