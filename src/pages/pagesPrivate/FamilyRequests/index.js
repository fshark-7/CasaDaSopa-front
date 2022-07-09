import {
  useEffect, useState, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Content,
  TableContent, TabContainer, TabProdHead, Tab,
  TabProdBody, TabContent,
} from './styles';

import FamilyRequestService from '../../../services/FamilyRequestService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import Table from '../components/Table';
import HeaderForm from '../components/HeaderForm';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';

export default function FamilyRequests() {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [familiesRequests, setFamiliesRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [toggle, setToggle] = useState(1);

  const navigate = useNavigate();

  const loadFamiliesRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyRequestService.listFamilyResquest(responsavel.id);
      setHasError(false);
      setFamiliesRequest(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [responsavel.id]);

  useEffect(() => {
    loadFamiliesRequests();
  }, [loadFamiliesRequests]);

  const handleTryAgain = () => {
    loadFamiliesRequests();
  };

  const toggleTab = (index) => {
    setToggle(index);
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await FamilyRequestService.deleteRequest(id);
      loadFamiliesRequests();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir solicitação: ${err}` });
    }
  };

  const handleEdit = (id) => {
    navigate(`/adm/familias/solicitacoes/edit/${id}`);
  };

  const requestsOpened = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação Aberta'
  ));

  const requestsProgress = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação em Progresso'
  ));

  const requestsCompleted = () => familiesRequests.filter((request) => (
    request.status === 'Solicitação Concluida'
  ));
  return (
    <Container>
      <HeaderForm title="Solicitações da família" to="/adm/familias" />

      {isLoading && <Loader />}

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={familiesRequests}
          textSing="solicitação"
          textPlu="solicitações"
          textButtom="Nova solicitação"
          to="/adm/familias/solicitacoes/new"
        />

        {hasError && (
          <ErrorContainer
            msgErro="Ocorreu um erro ao obter a lista solicitações da família"
            click={handleTryAgain}
          />
        )}

        <TabContainer>
          <TabProdHead>
            <Tab
              onClick={() => toggleTab(1)}
              className={toggle === 1 ? 'left active' : 'left'}
            >
              <h4>Solicitações abertas</h4>
            </Tab>
            <Tab
              onClick={() => toggleTab(2)}
              className={toggle === 2 ? 'right active' : 'right'}
            >
              <h4>Solicitações em progresso</h4>
            </Tab>

            <Tab
              onClick={() => toggleTab(3)}
              className={toggle === 3 ? 'right active' : 'right'}
            >
              <h4>Solicitações em concluidas</h4>
            </Tab>

          </TabProdHead>
          <TabProdBody>
            <TabContent className={toggle === 1 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsOpened().map((familyRequest) => (
                          <tr
                            key={familyRequest.id}
                          >
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">
                              {familyRequest.status}
                            </td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>

                              <abbr title="Remover">
                                <FaTrash
                                  className="remove"
                                  onClick={() => confirmeDeletAlert(
                                    { msg: 'Solicitação excluida com sucesso.' },
                                    () => handleRemove(familyRequest.id),
                                  )}
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

            <TabContent className={toggle === 2 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsProgress().map((familyRequest) => (
                          <tr key={familyRequest.id}>
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">{familyRequest.status}</td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>

                              <abbr title="Remover">
                                <FaTrash
                                  className="remove"
                                  onClick={() => confirmeDeletAlert(
                                    { msg: 'Solicitação excluida com sucesso.' },
                                    () => handleRemove(familyRequest.id),
                                  )}
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

            <TabContent className={toggle === 3 ? 'active' : ''}>
              <TableContent>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        requestsCompleted().map((familyRequest) => (
                          <tr key={familyRequest.id}>
                            <td data-title="Título">{familyRequest.titulo}</td>
                            <td data-title="Status">{familyRequest.status}</td>
                            <td data-title="Ações">

                              <abbr title="Editar">
                                <FaEdit
                                  onClick={() => handleEdit(familyRequest.id)}
                                  className="edit"
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </Table>
              </TableContent>
            </TabContent>

          </TabProdBody>
        </TabContainer>

      </Content>
    </Container>
  );
}
