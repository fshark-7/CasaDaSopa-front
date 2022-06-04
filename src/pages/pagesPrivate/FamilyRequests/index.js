import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Search, Content,
  TableContent,
} from './styles';

import FamilyRequestService from '../../../services/FamilyRequestService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import InputSearch from '../../../components/InputSearch';
import Table from '../components/Table';
import HeaderForm from '../components/HeaderForm';

export default function FamilyRequests() {
  const [responsavel] = useState(JSON.parse(localStorage.getItem('responsavel')));
  const [familiesRequests, setFamiliesRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const loadFamilies = async () => {
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
  };

  useEffect(() => {
    loadFamilies();
  }, []);

  const filteredFamiliesRequests = useMemo(() => familiesRequests.filter((family) => (
    family.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [familiesRequests, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadFamilies();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await FamilyRequestService.deleteRequest(id);
      loadFamilies();
      setIsLoading(true);
    //   console.log(message);
    } catch (err) {
    //   console.log(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/adm/familias/solicitacoes/edit/${id}`);
  };

  return (
    <Container>
      <HeaderForm title="Solicitações da família" to="/adm/familias" />

      {isLoading && <Loader />}

      <Search>
        <InputSearch
          value={searchTerm}
          placeholder="Pesquisar solicitação pelo titulo..."
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredFamiliesRequests}
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

        {
            filteredFamiliesRequests.length > 0
              ? (
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
                        filteredFamiliesRequests.map((familyRequest) => (
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
                                  onClick={() => handleRemove(familyRequest.id)}
                                />
                              </abbr>
                            </td>
                          </tr>
                        ))
                 }
                    </tbody>
                  </Table>
                </TableContent>
              )
              : null
        }
      </Content>
    </Container>
  );
}
