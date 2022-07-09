import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import formatCnpj from '../../../../utils/formatCnpj';
import EntityService from '../../../../services/EntityService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome fantasia é obrigatório.').min(3, 'O nome fantasia deve ter pelo menos 3 caracteres.'),
  razao: yup.string().required('A razão social é obrigatória.').min(3, 'A razão social deve ter pelo menos 3 caractéres.'),
  telefone: yup.string().required('O telefone é obrigatório.').min(10, 'O telefone deve ter pelo menos 10 caractéres.'),
  email: yup.string().required('O email é obrigatório.').email('Informe um email valido.'),
  endereco: yup.string().required('O endereço é obrigatório.').min(3, 'O endereço deve ter pelo menos 3 caractéres.'),
}).required();

export default function EntitiesForm({ id, buttonLabel }) {
  const [cnpj, setCnpj] = useState('');
  const navigate = useNavigate();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataEntity = useCallback(async () => {
    try {
      const { data } = await EntityService.getEntity(id);
      setValue('nome', data.nome_fantasia);
      setValue('razao', data.razao_social);
      setCnpj(data.cnpj);
      setValue('telefone', data.telefone);
      setValue('email', data.email);
      setValue('endereco', data.endereco);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados da endidade' });
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getDataEntity();
    }
  }, [getDataEntity, id]);

  const onSubmit = async (data) => {
    try {
      const dataEntities = {
        nome_fantasia: data.nome,
        razao_social: data.razao,
        cnpj,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
      };

      if (id) {
        await EntityService.updateEntity(id, dataEntities);
        sucessAlert({ msg: 'Entidade alterada com sucesso' });
      } else {
        await EntityService.createEntity(dataEntities);
        sucessAlert({ msg: 'Entidade cadastrada com sucesso' });
      }
      navigate('/adm/entidades');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormGrouping error={errors.nome?.message}>
        <Input
          error={errors.nome?.message}
          placeholder="Nome fantasia *"
          {...register('nome')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.razao?.message}>
        <Input
          error={errors.razao?.message}
          placeholder="Razão social"
          {...register('razao')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.cnpj?.message}>
        <Input
          error={errors.cnpj?.message}
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(formatCnpj(e.target.value))}
          maxLength={18}
        />
      </FormGrouping>

      <FormGrouping error={errors.telefone?.message}>
        <Input
          error={errors.telefone?.message}
          placeholder="Telefone"
          maxLength="20"
          {...register('telefone')}
        />
      </FormGrouping>

      <FormGrouping error={errors.email?.message}>
        <Input
          error={errors.email?.message}
          placeholder="E-mail"
          {...register('email')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.endereco?.message}>
        <Input
          error={errors.endereco?.message}
          placeholder="Endereço"
          {...register('endereco')}
          maxLength={120}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
