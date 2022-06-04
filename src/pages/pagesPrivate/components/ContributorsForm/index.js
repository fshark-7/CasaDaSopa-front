import { useEffect, useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import isEmailValid from '../../../../utils/isEmailValid';
import formatPhone from '../../../../utils/formatPhone';
import formatCpf from '../../../../utils/formatCpf';
import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import ContributorService from '../../../../services/ContributorService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

export default function ContributorsForm({ id, buttonLabel }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  const getDataContributor = useCallback(async () => {
    try {
      const { data } = await ContributorService.getContributor(id);
      setNome(data.nome);
      setSobrenome(data.sobrenome);
      setCpf(data.cpf);
      setTelefone(data.telefone);
      setEmail(data.email);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do colaborador' });
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (e) => {
    setTelefone(formatPhone(e.target.value));
  };

  const handleCpfChange = (e) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataContributors = {
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
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

      <FormGrouping error={getErrorsMEssageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorsMEssageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
