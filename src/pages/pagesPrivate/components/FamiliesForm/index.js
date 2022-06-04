import { useEffect, useState, useCallback } from 'react';

import formatPhone from '../../../../utils/formatPhone';
import formatCpf from '../../../../utils/formatCpf';
import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import FamilyService from '../../../../services/FamilyService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';

export default function FamiliesForm({
  id, buttonLabel, setIdResp, func,
}) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('');
  const [renda, setRenda] = useState('');
  const [outrasInformacoes, setOutrasInformacoes] = useState('');

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataContributor = useCallback(async () => {
    try {
      const { data } = await FamilyService.getFamily(id);
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setDataNasc(data.data_nasc);
      setSexo(data.sexo);
      setRenda(data.renda);
      setOutrasInformacoes(data.outras_informacoes);
    } catch (err) {
    //   console.log(err);
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

  const handlePhoneChange = (e) => {
    setTelefone(formatPhone(e.target.value));
  };

  const handleCpfChange = (e) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleRenda = (e) => {
    setRenda(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataFamilies = {
        nome,
        sobrenome,
        cpf,
        telefone,
        data_nasc: dataNasc,
        renda,
        sexo,
        outras_informacoes: outrasInformacoes,
        id_empresa: 1,
      };

      if (id) {
        await FamilyService.updateFamily(id, dataFamilies);
      } else {
        const { data } = await FamilyService.createFamily(dataFamilies);
        setIdResp(data.id);
      }
      func();
    } catch (err) {
    //   console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
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
          placeholder="Telefone"
          value={telefone}
          onChange={handlePhoneChange}
          maxLength="15"
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
        <Input
          placeholder="Informe a renda da casa"
          value={renda}
          onChange={handleRenda}
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
