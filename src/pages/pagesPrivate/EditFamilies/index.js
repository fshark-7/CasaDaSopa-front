import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import FamiliesForm from '../components/FamiliesForm';
import HeaderForm from '../components/HeaderForm';
import Dependents from '../Dependents';
import {
  Container, TabContainer, TabProdHead, Tab, TabProdBody, TabContent,
} from './styles';

export default function EditFamilies() {
  const [toggle, setToggle] = useState(1);
  const toggleTab = (index) => {
    setToggle(index);
  };

  const { id } = useParams();

  return (
    <Container>
      <HeaderForm title="Edição de familia" to="/adm/familias" />

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
              id={id || null}
              buttonLabel="Salvar alterações"
            />
          </TabContent>
          <TabContent className={toggle === 2 ? 'active' : ''}>
            <AddressForm
              buttonLabel="Salvar alterações"
              idResp={id}
              edit
            />
          </TabContent>

        </TabProdBody>
      </TabContainer>

      <Dependents idFamily={id} />

    </Container>
  );
}
