import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Form, ButtonContainer,
} from './styles';

import GroupService from '../../../../services/GroupService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string()
    .required('O nome é obrigatório.')
    .min(3, 'O nome do grupo deve ter pelo menos 3 caractéres.'),
}).required();

export default function GroupForm({ id, buttonLabel }) {
  const navigate = useNavigate();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataGroup = useCallback(async () => {
    try {
      const { data } = await GroupService.getGroup(id);

      setValue('nome', data[0].nome);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do grupo' });
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getDataGroup();
    }
  }, [getDataGroup, id]);

  const onSubmit = async (dados) => {
    try {
      const dataGroups = {
        nome: dados.nome,
        id_empresa: 1,
      };

      if (id) {
        await GroupService.updateGroup(id, dataGroups);
        sucessAlert({ msg: 'Grupo alterado com sucesso' });
        navigate('/adm/grupos/');
      } else {
        const { data } = await GroupService.createGroup(dataGroups);
        sucessAlert({ msg: 'Grupo cadastrado com sucesso' });
        navigate(`/adm/grupos/edit/${data.id}`);
      }
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrouping error={errors.nome?.message}>
        <Input
          error={errors.nome?.message}
          placeholder="Nome do grupo *"
          {...register('nome')}
          maxLength={60}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
