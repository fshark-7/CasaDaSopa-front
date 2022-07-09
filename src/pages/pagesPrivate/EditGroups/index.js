import {
  useEffect, useCallback, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { FaTrash } from 'react-icons/fa';

import GroupForm from '../components/GroupForm';
import HeaderForm from '../components/HeaderForm';
import Button from '../../../components/Button';
import ModalContibutors from '../components/ModalContibutors';
import Table from '../components/Table';
import GroupService from '../../../services/GroupService';
import ContributorGroupService from '../../../services/ContributorGroupService';
import { errorAlert } from '../../../utils/showAlert';
import Loader from '../../../components/Loader';

import {
  Container, HeaderContributors, ContainerContributors,
  TableContent,
} from './styles';

export default function EditGroups() {
  const [modalVisible, setModalVisible] = useState(false);
  const [colaboradores, setColaboradores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getDataColaboradores = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await GroupService.getGroup(id);

      setColaboradores(data[0].colaboradores);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do grupo' });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getDataColaboradores();
  }, [getDataColaboradores]);

  const toggleShowModal = () => {
    setModalVisible((prevState) => !prevState);
  };

  const toggleShowModalLoad = () => {
    setModalVisible(false);
    getDataColaboradores();
  };

  const removeContributorGroup = async (idEntrada) => {
    try {
      setIsLoading(true);
      await ContributorGroupService.deleteContributorGroup(idEntrada);
      getDataColaboradores();
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir o colaborador do grupo: ${err}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <HeaderForm title="Edição de grupo" to="/adm/grupos" />
      <GroupForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />

      <ContainerContributors>
        {isLoading && <Loader />}
        <HeaderContributors>
          <h1>Colaboradores do grupo</h1>

          <Button type="button" onClick={toggleShowModal}>Adicionar no Grupo</Button>

          {modalVisible && (
          <ModalContibutors
            func={toggleShowModal}
            click={() => toggleShowModalLoad()}
          />
          )}

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
              {
                colaboradores?.map((colab) => (
                  <tr key={colab.id}>
                    <td data-title="Nome">{colab.nome}</td>
                    <td data-title="Sobrenome">{colab.sobrenome}</td>
                    <td data-title="Excluir">
                      <FaTrash
                        className="remove"
                        onClick={
                            () => removeContributorGroup(colab.pivot_idEntrada)
                        }
                      />
                    </td>
                  </tr>
                ))
                }
            </tbody>
          </Table>
        </TableContent>

      </ContainerContributors>
    </Container>
  );
}
