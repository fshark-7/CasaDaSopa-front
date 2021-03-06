import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import formatCpf from '../../../../utils/formatCpf';
import ContributorService from '../../../../services/ContributorService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome deve ter pelo menos 3 caractéres.'),
  sobrenome: yup.string().required('O sobrenome é obrigatório.').min(3, 'O sobrenome deve ter pelo menos 3 caractéres.'),
  telefone: yup.string().required('O telefone é obrigatório.').min(10, 'O telefone deve ter pelo menos 10 caractéres.'),
  email: yup.string().required('O email é obrigatório.').email('Informe um email válido.'),
}).required();

export default function ContributorsForm({ id, buttonLabel }) {
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataContributor = useCallback(async () => {
    try {
      const { data } = await ContributorService.getContributor(id);
      setValue('nome', data.nome);
      setValue('sobrenome', data.sobrenome);
      setCpf(data.cpf);
      setValue('telefone', data.telefone);
      setValue('email', data.email);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do colaborador' });
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getDataContributor();
    }
  }, [getDataContributor, id]);

  const onSubmit = async (data) => {
    try {
      const dataContributors = {
        nome: data.nome,
        sobrenome: data.sobrenome,
        cpf,
        telefone: data.telefone,
        email: data.email,
        id_empresa: 1,
      };

      if (id) {
        await ContributorService.updateContributor(id, dataContributors);
        sucessAlert({ msg: 'Colaborador alterado com sucesso' });
      } else {
        await ContributorService.createContributor(dataContributors);
        sucessAlert({ msg: 'Colaborador cadastrado com sucesso' });
      }
      navigate('/adm/colaboradores');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormGrouping error={errors.nome?.message}>
        <Input
          error={errors.nome?.message}
          placeholder="Nome *"
          {...register('nome')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.sobrenome?.message}>
        <Input
          error={errors.sobrenome?.message}
          placeholder="Sobrenome"
          {...register('sobrenome')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.cpf?.message}>
        <Input
          error={errors.cpf?.message}
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          maxLength={14}
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

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
