import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import DependentService from '../../../../services/DependentService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';
import formatCpf from '../../../../utils/formatCpf';
import formatNascimento from '../../../../utils/formatNascimento';
import Loader from '../../../../components/Loader';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome deve ter pelo menos 3 caractéres.'),
  sobrenome: yup.string().required('O sobrenome é obrigatório.').min(3, 'O sobrenome deve ter pelo menos 3 caractéres.'),
  sexo: yup.string().required('O sexo é obrigatório.'),
}).required();

export default function DependentsForm({
  id, buttonLabel, idFamily,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');

  const navigate = useNavigate();
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataContributor = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await DependentService.getDependent(id);
      setValue('nome', data.nome);
      setValue('sobrenome', data.sobrenome);
      setCpf(data.cpf);
      setNascimento(data.data_nasc);
      setValue('sexo', data.sexo);
      setValue('outrasInformacoes', data.outras_informacoes);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do dependente' });
    } finally {
      setIsLoading(false);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      getDataContributor();
    }
  }, [getDataContributor, id]);

  useEffect(() => () => {
    localStorage.removeItem('idFamily');
  });

  const onSubmit = async (data) => {
    try {
      const dataDepend = {
        id_responsavel: idFamily,
        nome: data.nome,
        sobrenome: data.nome,
        cpf,
        data_nasc: nascimento,
        sexo: data.sexo,
        outras_informacoes: data.outrasInformacoes,
        id_empresa: 1,
      };

      if (id) {
        await DependentService.updateDependent(id, dataDepend);
        sucessAlert({ msg: 'Dependente alterado com sucesso' });
      } else {
        await DependentService.createDependent(dataDepend);
        sucessAlert({ msg: 'Dependente cadastrado com sucesso' });
      }
      navigate(`/adm/familia/edit/${idFamily}`);
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Loader />}
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

      <FormGrouping error={errors.dataNasc?.message}>
        <Input
          error={errors.dataNasc?.message}
          placeholder="Data de nascimento"
          value={nascimento}
          onChange={(e) => setNascimento(formatNascimento(e.target.value))}
          maxLength={10}
        />

      </FormGrouping>

      <FormGrouping error={errors.sexo?.message}>
        <Select
          error={errors.sexo?.message}
          {...register('sexo')}
        >
          <option value="">
            Informe o sexo
          </option>
          <option value="F">
            Feminino
          </option>
          <option value="M">
            Masculino
          </option>
          <option value="O">
            Outros
          </option>
        </Select>
      </FormGrouping>

      <FormGrouping>
        <TextArea
          placeholder="Observações, medicamentos que toma periodicamente..."
          {...register('outrasInformacoes')}
          maxLength={240}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
