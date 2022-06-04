import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';

import {
  Container, Photo, Content, ImageLogin, Areabtn,
} from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, senha);
  };

  return (
    <Container>
      <Photo />
      <Content>
        <ImageLogin />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGrouping>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              autoFocus
            />
          </FormGrouping>

          <FormGrouping>
            <Input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              placeholder="Senha"
            />
          </FormGrouping>

          <Areabtn>
            <FormGrouping>
              <Button type="submit">Acessar painel</Button>
            </FormGrouping>

            <FormGrouping>
              <Button onClick={() => navigate('/')}>Voltar a home</Button>
            </FormGrouping>
          </Areabtn>

        </form>
      </Content>
    </Container>
  );
}
