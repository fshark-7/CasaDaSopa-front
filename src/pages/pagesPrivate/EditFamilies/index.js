import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AddressForm from '../components/AddressForm';
import FamiliesForm from '../components/FamiliesForm';
import HeaderForm from '../components/HeaderForm';
import Dependents from '../Dependents';
import FamilyService from '../../../services/FamilyService';
import { errorAlert } from '../../../utils/showAlert';
import Loader from '../../../components/Loader';

import {
  Container, TabContainer, TabProdHead, Tab, TabProdBody, TabContent,
} from './styles';

export default function EditFamilies() {
  const [toggle, setToggle] = useState(1);
  const [responsavel, setResponsavel] = useState({});
  const [endereco, setEndereco] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dependentes, setDependentes] = useState([]);

  const toggleTab = (index) => {
    setToggle(index);
  };

  const { id } = useParams();

  const getDataFamily = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyService.getFamily(id);
      setResponsavel({
        id: data[0].id,
        nome: data[0].nome,
        sobrenome: data[0].sobrenome,
        cpf: data[0].cpf,
        telefone: data[0].telefone,
        nascimento: data[0].data_nasc,
        sexo: data[0].sexo,
        renda: data[0].renda,
        outrasInformacoes: data[0].outras_informacoes,
      });
      setEndereco(data[0].endereco);
      setDependentes(data[0].dependente);
    } catch (err) {
      errorAlert({ msg: 'Erro ao buscar dados do responsável da família' });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getDataFamily();
  }, [getDataFamily]);

  return (
    <Container>
      <HeaderForm title="Edição de familia" to="/adm/familias" />
      {isLoading && <Loader />}
      <TabContainer>
        <TabProdHead>
          <Tab
            onClick={() => toggleTab(1)}
            className={toggle === 1 ? 'left active' : 'left'}
          >
            <h4>Dados do responsável</h4>
          </Tab>
          <Tab
            onClick={() => toggleTab(2)}
            className={toggle === 2 ? 'right active' : 'right'}
          >
            <h4>Dados de endereço</h4>
          </Tab>

        </TabProdHead>
        <TabProdBody>
          <TabContent className={toggle === 1 ? 'active' : ''}>
            <FamiliesForm
              responsavel={responsavel}
              buttonLabel="Salvar alterações do responsável"
            />
          </TabContent>
          <TabContent className={toggle === 2 ? 'active' : ''}>
            <AddressForm
              buttonLabel="Salvar alterações do endereço"
              idResp={responsavel?.id}
              endereco={endereco}
            />
          </TabContent>

        </TabProdBody>
      </TabContainer>

      <Dependents dependents={dependentes} idResp={responsavel?.id} />
    </Container>
  );
}
