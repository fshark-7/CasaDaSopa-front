import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Content, TableContent, HeaderDependent,
} from './styles';

import Table from '../components/Table';
import DependentService from '../../../services/DependentService';
import Loader from '../../../components/Loader';
// import HeaderContent from '../components/HeaderContent';
import ErrorContainer from '../components/ErrorContainer';
import Button from '../../../components/Button';

export default function Dependents({ idFamily }) {
  const [dependents, setDependents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const loadDependent = async () => {
    try {
      setIsLoading(true);
      const { data } = await DependentService.listDependents(idFamily);

      setHasError(false);
      setDependents(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDependent();
  }, []);

  const handleTryAgain = () => {
    loadDependent();
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await DependentService.deleteDependent(id);
      loadDependent();
      setIsLoading(true);
    //   console.log(message);
    } catch (err) {
    //   console.log(err);
    }
  };

  const handleNovoDependente = () => {
    localStorage.setItem('idFamily', idFamily);
    navigate('/adm/dependentes/new');
  };

  const handleEditDependente = (id) => {
    localStorage.setItem('idFamily', idFamily);
    navigate(`/adm/dependentes/edit/${id}`);
  };

  return (
    <Container>

      {isLoading && <Loader />}

      <Content>
        <HeaderDependent>
          <Button
            onClick={handleNovoDependente}
          >
            Adicionar Dependente
          </Button>
        </HeaderDependent>

        {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista de dependentes"
          click={handleTryAgain}
        />
        )}

        {
            dependents.length > 0
              ? (
                <TableContent>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                    dependents.map((dependent) => (
                      <tr key={dependent.id}>
                        <td data-title="Nome">{dependent.nome}</td>
                        <td data-title="Sobrenome">{dependent.sobrenome}</td>
                        <td data-title="CPF">{dependent.cpf}</td>
                        <td data-title="Ações">
                          <FaEdit
                            className="edit"
                            onClick={() => handleEditDependente(dependent.id)}
                          />
                          <FaTrash className="remove" onClick={() => handleRemove(dependent.id)} />
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
