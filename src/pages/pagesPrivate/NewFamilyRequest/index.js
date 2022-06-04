import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/Button';
import FormGrouping from '../../../components/FormGrouping';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import HeaderForm from '../components/HeaderForm';
import FamilyRequestService from '../../../services/FamilyRequestService';
import { sucessAlert, errorAlert } from '../../../utils/showAlert';

import { Container, Form, ButtonContainer } from './styles';

export default function NewFamilyRequest() {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataSolicitacao = {
        id_responsavel: responsavel.id,
        titulo,
        descricao,
        nome: responsavel.nome,
        id_empresa: 1,
      };
      await FamilyRequestService.createRequest(dataSolicitacao);
      sucessAlert({ msg: 'Solicitação criada com sucesso' });
      navigate('/adm/familias/solicitacoes');
    } catch (err) {
      errorAlert({ msg: `Erro inesperado ${err}` });
    }
  };

  return (
    <Container>
      <HeaderForm title="Gerar solicitação" to="/adm/familias/solicitacoes" />

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

        <ButtonContainer>
          <Button type="submit">Confirmar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
