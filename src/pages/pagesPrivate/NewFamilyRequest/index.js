import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import HeaderForm from '../components/HeaderForm';
import FamilyRequestService from '../../../services/FamilyRequestService';
import { sucessAlert, errorAlert } from '../../../utils/showAlert';

import { Container, Form, ButtonContainer } from './styles';

const schema = yup.object({
  titulo: yup.string().required('O titulo é obrigatório.').min(3, 'O titulo deve ter pelo menos 3 caracteres.'),
  descricao: yup.string().required('A descricao é obrigatória.').min(3, 'A descricao tem pelo menos 3 caractéres.'),
}).required();

export default function NewFamilyRequest() {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const dataSolicitacao = {
        id_responsavel: responsavel.id,
        titulo: data.titulo,
        descricao: data.descricao,
        nome: responsavel.nome,
        id_empresa: 1,
      };
      await FamilyRequestService.createRequest(dataSolicitacao);
      sucessAlert({ msg: 'Solicitação criada com sucesso' });
      navigate('/adm/familias/solicitacoes');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      <HeaderForm title="Gerar solicitação" to="/adm/familias/solicitacoes" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGrouping error={errors.titulo?.message}>
          <Input
            error={errors.titulo?.message}
            placeholder="Titulo da solicitação *"
            {...register('titulo')}
          />
        </FormGrouping>

        <FormGrouping error={errors.descricao?.message}>
          <TextArea
            error={errors.descricao?.message}
            placeholder="Descrição detalhada da solicitação"
            {...register('descricao')}
          />
        </FormGrouping>

        <ButtonContainer>
          <Button type="submit">Confirmar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
