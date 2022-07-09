import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TableContent, CheckBox } from './styles';

import ContributorService from '../../../../services/ContributorService';
import Modal from '../../../../components/Modal';
import Table from '../Table';
import Loader from '../../../../components/Loader';
import GroupService from '../../../../services/GroupService';
import ContributorGroupService from '../../../../services/ContributorGroupService';

export default function ModalContibutors({
  func,
  click,
}) {
  const [contributors, setContributors] = useState([]);
  const [contributorsGroup, setContributorsGroup] = useState([]);
  const [listAddGroup, setListAddGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const loadContributorsGroup = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await ContributorService.listContributors();
      // setHasError(false);
      setContributors(data);

      const dados = await GroupService.getGroup(id);
      setContributorsGroup(dados.data[0].colaboradores);
    } catch {
      // setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadContributorsGroup();
  }, [loadContributorsGroup]);

  const filteredArray = () => {
    const array1Filtrado = contributors.filter((itemArray1) => (
      !contributorsGroup.some((itemArray2) => (
        itemArray1.id === itemArray2.id && itemArray1.nome === itemArray2.nome
      ))
    ));

    const arrayContributors = [];

    array1Filtrado.forEach((item) => {
      arrayContributors.push({
        id: item.id,
        nome: item.nome,
        sobrenome: item.sobrenome,
        check: false,
      });
    });
    return arrayContributors;
  };

  const toggleAddContributor = (idColaborador) => {
    const copyList = [...listAddGroup];
    const item = copyList.find((itemList) => itemList.idColab === idColaborador);
    if (!item) {
      copyList.push({
        idGrupo: id,
        idColab: idColaborador,
      });

      setListAddGroup(copyList);
    } else {
      const listFiltered = copyList.filter(
        (itemList) => itemList.idColab !== idColaborador,
      );

      setListAddGroup(listFiltered);
    }
  };

  const addContributorsGruop = () => {
    try {
      setIsLoading(true);
      listAddGroup.forEach(async (item) => {
        const dados = {
          grupo_id: item.idGrupo,
          colaborador_id: item.idColab,
        };
        await ContributorGroupService.createContributorGroup(dados);
        click();
      });
    } catch {
      //
    } finally {
    //   load();
      setIsLoading(false);
    }
  };

  return (
    <Modal
      titleBtn="Confirmar"
      titleModal="Lista de colaboradores"
      close={func}
      click={addContributorsGruop}
    >
      <TableContent>
        {isLoading && <Loader />}
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>
            {
                filteredArray().map((contributor) => (
                  <tr key={contributor.id}>
                    <td data-title="Nome">
                      {contributor.nome}
                      {' '}
                      {contributor.sobrenome}
                    </td>
                    <td data-title="Adicionar">
                      <CheckBox
                        type="checkbox"
                        onChange={() => toggleAddContributor(contributor.id)}
                      />
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </TableContent>
    </Modal>

  );
}
