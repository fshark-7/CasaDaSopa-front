import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Container, Content, TableContent, HeaderDependent,
} from './styles';

import Table from '../components/Table';
import DependentService from '../../../services/DependentService';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import { errorAlert, confirmeDeletAlert, sucessAlert } from '../../../utils/showAlert';

export default function Dependents({ dependents, idResp }) {
  const [dependentes, setDependentes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setDependentes(dependents);
  }, [dependents]);

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await DependentService.deleteDependent(id);
      const deps = dependentes.filter((d) => d.id !== id);
      setDependentes(deps);
      sucessAlert({ msg: 'Dependente excluido com sucesso.' });
    } catch (err) {
      errorAlert({ msg: `Erro ao excluir o dependente: ${err}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNovoDependente = () => {
    localStorage.setItem('idFamily', idResp);
    navigate('/adm/dependentes/new');
  };

  const handleEditDependente = (id) => {
    localStorage.setItem('idFamily', idResp);
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

        {
          dependentes?.length > 0
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
                      dependentes?.map((dependent) => (
                        <tr key={dependent.id}>
                          <td data-title="Nome">{dependent.nome}</td>
                          <td data-title="Sobrenome">{dependent.sobrenome}</td>
                          <td data-title="CPF">{dependent.cpf}</td>
                          <td data-title="Ações">
                            <FaEdit
                              className="edit"
                              onClick={() => handleEditDependente(dependent.id)}
                            />
                            <FaTrash
                              className="remove"
                              onClick={() => confirmeDeletAlert(
                                { msg: 'Dependente excluido com sucesso.' },
                                () => handleRemove(dependent.id),
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
