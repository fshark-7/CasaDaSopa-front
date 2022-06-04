import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useErrors from '../../../../hooks/useErrors';

import {
  Form, ButtonContainer,
} from './styles';

import GroupService from '../../../../services/GroupService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function GroupForm({ id, buttonLabel }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  const getDataGroup = useCallback(async () => {
    try {
      const { data } = await GroupService.getGroup(id);
      setName(data.nome);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDataGroup();
    }
  }, [getDataGroup, id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome do grupo é obrigatório.' });
    } else {
      removeError('name');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataGroups = {
        nome: name,
        id_empresa: 1,
      };

      if (id) {
        const { message } = await GroupService.updateGroup(id, dataGroups);
        console.log(message);
      } else {
        const { message, data } = await GroupService.createGroup(dataGroups);
        console.log(message);
        navigate(`/adm/grupos/edit/${data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('name')}>
        <Input
          placeholder="Nome do grupo *"
          value={name}
          onChange={handleNameChange}
          error={getErrorsMEssageByFieldName('name')}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
