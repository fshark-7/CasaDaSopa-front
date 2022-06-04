import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Search, Content,
  TableContent,
} from './styles';

import HeaderPage from '../components/HeaderPage';
import EntityService from '../../../services/EntityService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import InputSearch from '../../../components/InputSearch';
import Table from '../components/Table';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';

export default function Entities() {
  const [entities, setEntities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadEntities = async () => {
    try {
      setIsLoading(true);
      const { data } = await EntityService.listEntities();
      setHasError(false);
      setEntities(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntities();
  }, []);

  const filteredEntitites = useMemo(() => entities.filter((entity) => (
    entity.nome_fantasia.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [entities, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadEntities();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await EntityService.deleteEntity(id);
      loadEntities();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir a entidade: ${err}` });
    }
  };
  return (
    <Container>
      <HeaderPage title="Entidades" />
      {isLoading && <Loader />}

      <Search>
        <InputSearch
          placeholder="Pesquisar entidade pelo nome fantasia..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredEntitites}
          textSing="entidade"
          textPlu="entidades"
          textButtom="Nova entidade"
          to="/adm/entidades/new"
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de entidades"
          click={handleTryAgain}
        />
        )}

        {
            filteredEntitites.length > 0
              ? (
                <TableContent>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome fantasia</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                            filteredEntitites.map((entity) => (
                              <tr key={entity.id}>
                                <td data-title="Nome fantasia">{entity.nome_fantasia}</td>
                                <td data-title="CNPJ">{entity.cnpj}</td>
                                <td data-title="Telefone">{entity.telefone}</td>
                                <td data-title="Ações">
                                  <Link to={`/adm/entidades/edit/${entity.id}`}>
                                    <FaEdit className="edit" />
                                  </Link>

                                  <FaTrash
                                    className="remove"
                                    onClick={() => confirmeDeletAlert(
                                      { msg: 'Entidade excluida com sucesso.' },
                                      () => handleRemove(entity.id),
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
