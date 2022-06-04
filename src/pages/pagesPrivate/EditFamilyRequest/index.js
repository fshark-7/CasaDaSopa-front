import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

export default function EditFamilyRequest() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [idResp, setIdResp] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const getDataRequestFamily = useCallback(async () => {
    try {
      const { data } = await FamilyRequestService.getResquest(id);
      setIdResp(data.id_responsavel);
      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setNome(data.nome);
      setStatus(data.status);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados da solicitação' });
    }
  }, [id]);

  useEffect(() => {
    getDataRequestFamily();
  }, [getDataRequestFamily]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataReq = {
        nome,
        id_responsavel: idResp,
        titulo,
        descricao,
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

      <Form onSubmit={handleSubmit}>
        <FormGrouping>
          <Input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Titulo da solicitação *"
          />
        </FormGrouping>

        <FormGrouping>
          <TextArea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição detalhada da solicitação"
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
