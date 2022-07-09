import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthContext } from '../../../context/auth';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';

import {
  Container, Photo, Content, ImageLogin, Areabtn,
} from './styles';

const schema = yup.object({
  email: yup.string().required('O e-mail é obrigatório.').email('Informe um e-mail válido.'),
  senha: yup.string().required('A senha é obrigatória.'),
}).required();

export default function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useContext(AuthContext);

  const onSubmit = (data) => {
    login(data.email, data.senha);
  };

  return (
    <Container>
      <Photo />
      <Content>
        <ImageLogin />
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGrouping error={errors.email?.message}>
            <Input
              error={errors.email?.message}
              placeholder="E-mail"
              autoFocus
              {...register('email')}
            />
          </FormGrouping>

          <FormGrouping error={errors.senha?.message}>
            <Input
              error={errors.senha?.message}
              type="password"
              placeholder="Senha"
              {...register('senha')}
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
