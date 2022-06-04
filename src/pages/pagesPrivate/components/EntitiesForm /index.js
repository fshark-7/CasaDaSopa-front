import { useEffect, useState, useCallback } from 'react';
import { Form, ButtonContainer } from './styles';

import isEmailValid from '../../../../utils/isEmailValid';
import formatPhone from '../../../../utils/formatPhone';
import formatCnpj from '../../../../utils/formatCnpj';
import useErrors from '../../../../hooks/useErrors';

import EntityService from '../../../../services/EntityService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function EntitiesForm({ id, buttonLabel }) {
  const [name, setName] = useState('');
  const [razao, setRazao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  const getDataEntity = useCallback(async () => {
    try {
      const { data } = await EntityService.getEntity(id);
      setName(data.nome_fantasia);
      setRazao(data.razao_social);
      setCnpj(data.cnpj);
      setTelefone(data.telefone);
      setEmail(data.email);
      setEndereco(data.endereco);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataEntity();
    }
  }, [getDataEntity, id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
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

  const handleCnpjChange = (e) => {
    setCnpj(formatCnpj(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataEntities = {
        nome_fantasia: name,
        razao_social: razao,
        cnpj,
        telefone,
        email,
        endereco,
      };

      if (id) {
        const { message } = await EntityService.updateEntity(id, dataEntities);
        console.log(message);
      } else {
        const { message } = await EntityService.createEntity(dataEntities);
        console.log(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGrouping error={getErrorsMEssageByFieldName('name')}>
        <Input
          error={getErrorsMEssageByFieldName('name')}
          placeholder="Nome fantasia *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Razão social"
          value={razao}
          onChange={(e) => setRazao(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="CNPJ"
          value={cnpj}
          onChange={handleCnpjChange}
          maxLength="18"
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
          error={getErrorsMEssageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
