import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, ButtonContainer } from './styles';

import formatCep from '../../../../utils/formatCep';
import AddressService from '../../../../services/AddressService';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { sucessAlert, errorAlert } from '../../../../utils/showAlert';

const schema = yup.object({
  cidade: yup.string().required('A cidade é obrigatória.').min(3, 'A cidade tem pelo menos 3 caractéres.'),
  estado: yup.string().required('O estado é obrigatório.').min(2, 'O estado tem pelo menos 2 caractéres.'),
  rua: yup.string().required('A rua é obrigatória.').min(3, 'A rua tem pelo menos 3 caractéres.'),
  numero: yup.string().required('O número é obrigatório.'),
  bairro: yup.string().required('O bairro é obrigatória.').min(3, 'O bairro tem pelo menos 3 caractéres.'),
}).required();

export default function AddressForm({
  buttonLabel, endereco,
  idResp,
}) {
  const [cep, setCep] = useState('');

  const navigate = useNavigate();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataEndereco = useCallback(() => {
    try {
      setCep(endereco?.cep);
      setValue('estado', endereco?.estado);
      setValue('cidade', endereco?.cidade);
      setValue('rua', endereco?.rua);
      setValue('numero', endereco?.numero);
      setValue('bairro', endereco?.bairro);
      setValue('complemento', endereco?.complemento);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do endereço' });
    }
  }, [setValue, endereco]);

  useEffect(() => {
    if (endereco) {
      getDataEndereco();
    }
  }, [getDataEndereco, endereco]);

  const onSubmit = async (dados) => {
    try {
      const dataEnd = {
        cep,
        estado: dados.estado,
        cidade: dados.cidade,
        rua: dados.rua,
        numero: dados.numero,
        bairro: dados.bairro,
        complemento: dados.complemento,
        id_responsavel: idResp,
      };
      if (endereco) {
        await AddressService.updateAddress(endereco?.id, dataEnd);
        sucessAlert({ msg: 'Endereço alterado com sucesso' });
      } else {
        await AddressService.createAddress(dataEnd);
        navigate('/adm/familias/');
      }
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <FormGrouping>
        <Input
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.rua?.message}>
        <Input
          error={errors.rua?.message}
          placeholder="Rua"
          {...register('rua')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.bairro?.message}>
        <Input
          error={errors.bairro?.message}
          placeholder="Bairro"
          {...register('bairro')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.bairro?.message}>
        <Input
          error={errors.bairro?.message}
          placeholder="Número"
          {...register('numero')}
          maxLength={20}
        />
      </FormGrouping>

      <FormGrouping>
        <Input
          placeholder="Complemento"
          {...register('complemento')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.cidade?.message}>
        <Input
          error={errors.cidade?.message}
          placeholder="Cidade"
          {...register('cidade')}
          maxLength={60}
        />
      </FormGrouping>

      <FormGrouping error={errors.estado?.message}>
        <Input
          error={errors.estado?.message}
          placeholder="Estado"
          {...register('estado')}
          maxLength={30}
        />
      </FormGrouping>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}
