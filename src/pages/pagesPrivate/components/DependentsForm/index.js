import { useEffect, useState, useCallback } from 'react';

import formatCpf from '../../../../utils/formatCpf';
import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import DependentService from '../../../../services/DependentService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

export default function DependentsForm({
  id, buttonLabel, idFamily,
}) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [outrasInformacoes, setOutrasInformacoes] = useState('');

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataContributor = useCallback(async () => {
    try {
      const { data } = await DependentService.getDependent(id);
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setCpf(data.cpf);
      setDataNasc(data.data_nasc);
      setSexo(data.sexo);
      setOutrasInformacoes(data.outras_informacoes);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do dependente' });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataContributor();
    }
  }, [getDataContributor, id]);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    if (!e.target.value) {
      setError({ field: 'nome', message: 'Nome é obrigatório.' });
    } else {
      removeError('nome');
    }
  };

  const handleDataNascimento = (e) => {
    setDataNasc(e.target.value);
  };

  const handleCpfChange = (e) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataDepend = {
        id_responsavel: idFamily,
        nome,
        sobrenome,
        cpf,
        data_nasc: dataNasc,
        sexo,
        outras_informacoes: outrasInformacoes,
        id_empresa: 1,
      };

      if (id) {
        await DependentService.updateDependent(id, dataDepend);
        sucessAlert({ msg: 'Dependente alterado com sucesso' });
      } else {
        await DependentService.createDependent(dataDepend);
        sucessAlert({ msg: 'Dependente cadastrado com sucesso' });
      }
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('nome')}>
        <Input
          error={getErrorsMEssageByFieldName('nome')}
          placeholder="Nome *"
          value={nome}
          onChange={handleNomeChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="CPF"
          value={cpf}
          onChange={handleCpfChange}
          maxLength="14"
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          type="dataNasc"
          placeholder="Data de nascimento"
          value={dataNasc}
          onChange={handleDataNascimento}
        />
      </FormGrouping>

      <FormGrouping>
        <Select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
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
          value={outrasInformacoes}
          onChange={(e) => setOutrasInformacoes(e.target.value)}
          placeholder="Observações, medicamentos que toma periodicamente..."
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
