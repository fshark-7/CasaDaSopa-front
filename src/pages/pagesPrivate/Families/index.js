import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa';
import {
  Container, Search, Content,
  TableContent,
} from './styles';

import HeaderPage from '../components/HeaderPage';
import FamilyService from '../../../services/FamilyService';
import Loader from '../../../components/Loader';
import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import InputSearch from '../../../components/InputSearch';
import Table from '../components/Table';
import { errorAlert, confirmeDeletAlert } from '../../../utils/showAlert';
import FamiliasPDF from '../components/Reports/FamiliasRelatorio ';

export default function Families() {
  const [families, setFamilies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const loadFamilies = async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyService.listFamilies();
      setHasError(false);
      setFamilies(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem('responsavel');
    loadFamilies();
  }, []);

  const filteredFamilies = useMemo(() => families.filter((family) => (
    family.nome.toLowerCase().startsWith(searchTerm.toLowerCase())
  )), [families, searchTerm]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadFamilies();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await FamilyService.deleteFamily(id);
      loadFamilies();
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir a família: ${err}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolicitacoes = (resp) => {
    localStorage.setItem('responsavel', JSON.stringify(resp));
    navigate('/adm/familias/solicitacoes');
  };

  return (
    <Container>
      <HeaderPage title="Família" />

      {isLoading && <Loader />}

      <Search>
        <InputSearch
          value={searchTerm}
          placeholder="Pesquisar familia pelo nome responsável..."
          onChange={handleChangeSearchTerm}
        />
      </Search>

      <Content>
        <HeaderContent
          hasError={hasError}
          filteredArray={filteredFamilies}
          textSing="família"
          textPlu="famílias"
          textButtom="Nova família"
          to="/adm/familia/new"
          print={() => FamiliasPDF(families)}
        />

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de famílias"
          click={handleTryAgain}
        />
        )}

        {
            filteredFamilies.length > 0

              ? (
                <TableContent>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredFamilies.map((family) => (
                          <tr key={family.id}>
                            <td data-title="Nome">{family.nome}</td>
                            <td data-title="Sobrenome">{family.sobrenome}</td>
                            <td data-title="CPF">{family.cpf}</td>
                            <td data-title="Ações">
                              <Link to={`/adm/familia/edit/${family.id}`}>
                                <abbr title="Editar">
                                  <FaEdit className="edit" />
                                </abbr>
                              </Link>

                              <abbr title="Remover">
                                <FaTrash
                                  className="remove"
                                  onClick={() => confirmeDeletAlert(
                                    { msg: 'Família excluida com sucesso.' },
                                    () => handleRemove(family.id),
                                  )}
                                />
                              </abbr>

                              <abbr title="Solicitações">
                                <FaHeart className="solicitacao" onClick={() => handleSolicitacoes(family)} />
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
