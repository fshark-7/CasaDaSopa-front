import { useEffect, useState, useCallback } from 'react';

import useErrors from '../../../../hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import AddressService from '../../../../services/AddressService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export default function AddressForm({
  idEndereco, buttonLabel, idResp, edit,
}) {
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');

  const {
    setError, removeError, getErrorsMEssageByFieldName, errors,
  } = useErrors();

  const isFormValid = (cep && errors.length === 0);

  const getDataContributor = useCallback(async () => {
    try {
      const { data } = await AddressService.getAddress(idResp);
      setCep(data.cep);
      setEstado(data.estado);
      setCidade(data.cidade);
      setRua(data.rua);
      setNumero(data.numero);
      setBairro(data.bairro);
      setComplemento(data.complemento);
    } catch (err) {
      console.log('erro');
      // console.log(err);
    }
  }, [idResp]);

  useEffect(() => {
    if (edit) {
      getDataContributor();
    }
  }, [getDataContributor, edit]);

  const handleCepChange = (e) => {
    setCep(e.target.value);
    if (!e.target.value) {
      setError({ field: 'cep', message: 'O CEP é obrigatório.' });
    } else {
      removeError('cep');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataEnd = {
        cep,
        estado,
        cidade,
        rua,
        numero,
        bairro,
        complemento,
        id_responsavel: idResp,
      };

      if (edit) {
        await AddressService.updateAddress(idEndereco, dataEnd);
      } else {
        await AddressService.createAddress(dataEnd);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGrouping error={getErrorsMEssageByFieldName('cep')}>
        <Input
          error={getErrorsMEssageByFieldName('cep')}
          placeholder="CEP"
          value={cep}
          onChange={handleCepChange}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
