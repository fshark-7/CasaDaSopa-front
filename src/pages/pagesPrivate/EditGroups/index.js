import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import GroupForm from '../components/GroupForm';
import HeaderForm from '../components/HeaderForm';
import Button from '../../../components/Button';
import ModalContibutors from '../components/ModalContibutors';
import Table from '../components/Table';

import {
  Container, HeaderContributors, ContainerContributors,
  TableContent,
} from './styles';

export default function EditGroups() {
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();

  const toggleShowModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  return (
    <Container>
      <HeaderForm title="Edição de grupo" to="/adm/grupos" />
      <GroupForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />

      <ContainerContributors>

        <HeaderContributors>
          <h1>Colaboradores do grupo</h1>

          <Button type="button" onClick={toggleShowModal}>Adicionar no Grupo</Button>

          {modalVisible && <ModalContibutors idGroup={id} func={toggleShowModal} />}

        </HeaderContributors>

        <TableContent>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-title="Nome">Nome</td>
                <td data-title="Sobrenome">sobrenome</td>
                <td data-title="Excluir">
                  <FaTrash className="remove" />
                </td>
              </tr>
            </tbody>
          </Table>
        </TableContent>

      </ContainerContributors>
    </Container>
  );
}
