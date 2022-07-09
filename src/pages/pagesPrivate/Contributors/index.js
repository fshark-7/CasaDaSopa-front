import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

import {
  Container, Search, Content,
  TableContent,
} from './styles';

import HeaderPage from '../components/HeaderPage';
import HeaderContent from '../components/HeaderContent';
import ContributorService from '../../../services/ContributorService';
import Loader from '../../../components/Loader';
import ErrorContainer from '../components/ErrorContainer';
import InputSearch from '../../../components/InputSearch';
import Table from '../components/Table';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';
import ColaboradoresPDF from '../components/Reports/ColaboradoresRelatorio';

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadContributors = async () => {
    try {
      setIsLoading(true);
      const { data } = await ContributorService.listContributors();
      setHasError(false);
      setContributors(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContributors();
  }, []);

  const filteredContributors = useMemo(() => contributors.filter((contributor) => (
    contributor.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [contributors, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadContributors();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await ContributorService.deleteContributor(id);
      loadContributors();
      setIsLoading(true);
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir o colaborador: ${err}` });
    }
  };

  return (
    <Container>
      <HeaderPage title="Colaboradores" />
      {isLoading && <Loader />}
      <Search>
        <InputSearch
          value={searchTerm}
          placeholder="Pesquisar colaborador pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>

        <HeaderContent
          hasError={hasError}
          filteredArray={filteredContributors}
          textSing="colaborador"
          textPlu="colaboradores"
          textButtom="Novo Colaborador"
          to="/adm/colaboradores/new"
          print={() => ColaboradoresPDF(contributors)}
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de colaboradores"
          click={handleTryAgain}
        />
        )}

        {
            filteredContributors.length > 0
              ? (
                <TableContent>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                            filteredContributors.map((contributor) => (
                              <tr key={contributor.id}>
                                <td data-title="Nome">{contributor.nome}</td>
                                <td data-title="Sobrenome">{contributor.sobrenome}</td>
                                <td data-title="Telefone">{contributor.telefone}</td>
                                <td data-title="Ações">
                                  <Link to={`/adm/colaboradores/edit/${contributor.id}`}>
                                    <FaEdit className="edit" />
                                  </Link>

                                  <FaTrash
                                    className="remove"
                                    onClick={() => confirmeDeletAlert(
                                      { msg: 'Colaborador excluido com sucesso.' },
                                      () => handleRemove(contributor.id),
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
