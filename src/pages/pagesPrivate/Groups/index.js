import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Search, Content,
  TableContent,
} from './styles';

import HeaderPage from '../components/HeaderPage';
import GroupService from '../../../services/GroupService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import InputSearch from '../../../components/InputSearch';
import Table from '../components/Table';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadEntities = async () => {
    try {
      setIsLoading(true);
      const { data } = await GroupService.listGroups();
      setHasError(false);
      setGroups(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntities();
  }, []);

  const filteredGroups = useMemo(() => groups.filter((group) => (
    group.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [groups, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadEntities();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await GroupService.deleteGroup(id);
      loadEntities();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir o grupo: ${err}` });
    }
  };

  return (
    <Container>
      <HeaderPage title="Grupos" />

      {isLoading && <Loader />}

      <Search>
        <InputSearch
          value={searchTerm}
          placeholder="Pesquisar grupo pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredGroups}
          textSing="grupo"
          textPlu="grupos"
          textButtom="Novo grupo"
          to="/adm/grupos/new"
        />

        {hasError && (
        <ErrorContainer
          msgErro=" Ocorreu um erro ao obter a lista de grupos"
          click={handleTryAgain}
        />
        )}

        {
            filteredGroups.length > 0

              ? (
                <TableContent>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                            filteredGroups.map((group) => (
                              <tr key={group.id}>
                                <td data-title="Nome">{group.nome}</td>
                                <td data-title="Ações">
                                  <Link to={`/adm/grupos/edit/${group.id}`}>
                                    <FaEdit className="edit" />
                                  </Link>

                                  <FaTrash
                                    className="remove"
                                    onClick={() => confirmeDeletAlert(
                                      { msg: 'Grupo excluido com sucesso.' },
                                      () => handleRemove(group.id),
                                    )}
                                  />
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
