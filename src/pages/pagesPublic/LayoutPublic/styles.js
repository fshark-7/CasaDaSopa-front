import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.header`
    height: 80px;
    color: #FFF;
    a{
        color: #FFF;
    }
    background: ${({ theme }) => theme.colors.primary.main};
`;

export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: auto;
    max-width: 1200px;
    padding: 0 10px;
`;

export const Logo = styled.div`

`;

export const List = styled.nav`
       >ul{
            position: initial;
            display: block;
            height: auto;
            width: fit-content;
            background: transparent;
        }
        >ul li{
            display: inline-block;
            margin-left: 16px;
        }
        >ul li a{
            font-size: 18px;
        }
        >ul li:hover a:hover{
            color: ${(props) => props.theme.colors.primary};
        }
        >ul a::after{
            display: none;
        }
`;

export const Footer = styled.footer`
    text-align: center;
    background: gray;
`;
