import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import TextArea from '../../../components/TextArea';
import HeaderForm from '../components/HeaderForm';
import FamilyRequestService from '../../../services/FamilyRequestService';
import { sucessAlert, errorAlert } from '../../../utils/showAlert';

import {
  Container, Form, ButtonContainer,
} from './styles';

const schema = yup.object({
  titulo: yup.string().required('O titulo é obrigatório.').min(3, 'O titulo deve ter pelo menos 3 caracteres.'),
  descricao: yup.string().required('A descricao é obrigatória.').min(3, 'A descricao tem pelo menos 3 caractéres.'),
}).required();

export default function EditFamilyRequest() {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [idResp, setIdResp] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getDataRequestFamily = useCallback(async () => {
    try {
      const { data } = await FamilyRequestService.getResquest(id);
      setIdResp(data.id_responsavel);
      setValue('titulo', data.titulo);
      setValue('descricao', data.descricao);
      setNome(data.nome);
      setStatus(data.status);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados da solicitação' });
    }
  }, [id, setValue]);

  useEffect(() => {
    getDataRequestFamily();
  }, [getDataRequestFamily]);

  const onSubmit = async (data) => {
    try {
      const dataReq = {
        nome,
        id_responsavel: idResp,
        titulo: data.titulo,
        descricao: data.descricao,
        status,
      };

      await FamilyRequestService.updateRequest(id, dataReq);
      sucessAlert({ msg: 'Solicitação alterada com sucesso' });
      navigate('/adm/familias/solicitacoes');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      <HeaderForm title="Editar solicitação" to="/adm/familias/solicitacoes" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGrouping error={errors.titulo?.message}>
          <Input
            error={errors.titulo?.message}
            placeholder="Titulo da solicitação *"
            {...register('titulo')}
          />
        </FormGrouping>

        <FormGrouping error={errors.descricao?.message}>
          <TextArea
            error={errors.descricao?.message}
            placeholder="Descrição detalhada da solicitação"
            {...register('descricao')}
          />
        </FormGrouping>

        <FormGrouping>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Solicitação Aberta">Solicitação aberta</option>
            <option value="Solicitação em Progresso">Solicitação em progresso</option>
            <option value="Solicitação Concluida">Solicitação concluída</option>
          </Select>
        </FormGrouping>

        <ButtonContainer>
          <Button type="submit">Confirmar</Button>
        </ButtonContainer>

      </Form>

    </Container>
  );
}
