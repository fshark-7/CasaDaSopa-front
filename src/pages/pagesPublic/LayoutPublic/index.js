import { Outlet, Link } from 'react-router-dom';

import {
  Container, Header, NavContainer, Logo, List, Footer,
} from './styles';

export default function LayoutPublic() {
  return (
    <Container>
      <Header>
        <NavContainer>
          <Logo>
            <Link to="/">
              <h1>Casa da Sopa</h1>
            </Link>
          </Logo>

          <List>
            <ul>
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/solicitacoes">
                  Solicitações
                </Link>
              </li>
              <li>
                <Link to="/login">
                  Painel
                </Link>
              </li>
            </ul>

          </List>
        </NavContainer>

      </Header>

      <Outlet />

      <Footer>
        Desenvolvido por Fabricio e Felipe
      </Footer>
    </Container>
  );
}
