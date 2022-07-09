import { useEffect, useState } from 'react';
import {
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import FamilyService from '../../../../services/FamilyService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';
import formatCpf from '../../../../utils/formatCpf';
import formatNascimento from '../../../../utils/formatNascimento';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório.').min(3, 'O nome deve ter pelo menos 3 caractéres.'),
  sobrenome: yup.string().required('O sobrenome é obrigatório.').min(3, 'O sobrenome deve ter pelo menos 3 caractéres.'),
  telefone: yup.string().required('O telefone é obrigatório.').min(10, 'O telefone deve ter pelo menos 10 caractéres.'),
  renda: yup.number().required().typeError('Renda inválida.'),
  sexo: yup.string().required('O sexo é obrigatório.'),
}).required();

export default function FamiliesForm({
  buttonLabel, func, setIdResp, responsavel,
}) {
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (responsavel) {
      setValue('nome', responsavel?.nome);
      setValue('sobrenome', responsavel?.sobrenome);
      setCpf(responsavel?.cpf);
      setValue('telefone', responsavel?.telefone);
      setNascimento(responsavel?.nascimento);
      setValue('sexo', responsavel?.sexo);
      setValue('renda', responsavel?.renda);
      setValue('outrasInformacoes', responsavel?.outrasInformacoes);
    }
  }, [setValue, responsavel]);

  const onSubmit = async (dados) => {
    let rendaResp = 0;
    try {
      if (dados.renda !== '') {
        rendaResp = Number(dados.renda);
      }
      const dataFamilies = {
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        cpf,
        telefone: dados.telefone,
        data_nasc: nascimento,
        renda: rendaResp,
        sexo: dados.sexo,
        outras_informacoes: dados.outrasInformacoes,
        id_empresa: 1,
      };

      if (responsavel) {
        await FamilyService.updateFamily(responsavel?.id, dataFamilies);
        sucessAlert({ msg: 'Responsável da família Alerado com sucesso' });
      } else {
        const { data } = await FamilyService.createFamily(dataFamilies);
        setIdResp(data.id);
        sucessAlert({ msg: 'Responsável da família cadastrada com sucesso' });
      }
      func();
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
          placeholder="Sobrenome *"
          {...register('sobrenome')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.cpf?.message}>
        <Input
          error={errors.cpf?.message}
          placeholder="CPF"
          value={cpf}
          onChange={(e) => (setCpf(formatCpf(e.target.value)))}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.telefone?.message}>
        <Input
          error={errors.telefone?.message}
          placeholder="Telefone"
          maxLength={20}
          {...register('telefone')}
        />
      </FormGrouping>

      <FormGrouping error={errors.cpf?.message}>
        <Input
          error={errors.cpf?.message}
          placeholder="Data de nascimento"
          value={nascimento}
          onChange={(e) => (setNascimento(formatNascimento(e.target.value)))}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.renda?.message}>
        <Input
          error={errors.renda?.message}
          placeholder="Informe a renda da casa"
          {...register('renda')}
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
