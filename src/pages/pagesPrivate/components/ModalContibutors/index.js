import { useEffect, useState } from 'react';

// import { MdRadioButtonUnchecked } from 'react-icons/md';
import { TableContent } from './styles';

import ContributorService from '../../../../services/ContributorService';
import Modal from '../../../../components/Modal';
import PaginationComponent from '../../../../components/PaginationComponent';
import Table from '../Table';

export default function ModalContibutors({ func }) {
  const [contributors, setContributors] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const contributorsPage = 5;
  const pages = Math.ceil(contributors.length / contributorsPage);
  const startIndex = currentPage * contributorsPage;
  const endIndex = startIndex + contributorsPage;

  // const contributorsNotGroup = contributors()
  const currentContributors = contributors.slice(startIndex, endIndex);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        //      setIsLoading(true);
        const { data } = await ContributorService.listContributors();
        //      setHasError(false);
        setContributors(data);
      } catch {
        //      setHasError(true);
      } finally {
        //      setIsLoading(false);
      }
    };
    loadContributors();
  }, []);

  //   const handleCheck = (e, id) => {
  //     e.targt
  //     () => console.log('id colaborador', contributor.id)
  //   }

  return (
    <Modal
      titleBtn="Confirmar"
      titleModal="Lista de colaboradores"
      close={func}
    >
      <TableContent>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>

            {
                currentContributors.map((contributor) => (
                  <tr key={contributor.id}>
                    <td data-title="Nome">
                      {contributor.nome}
                      {' '}
                      {contributor.sobrenome}
                    </td>
                    <td data-title="Adicionar">
                      {/* <MdRadioButtonUnchecked /> */}
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))
            }

          </tbody>
        </Table>
      </TableContent>

      {
            pages > 1 ? (
              <PaginationComponent
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ) : null
        }

    </Modal>

  );
}
