import { useState } from 'react';

import FamiliesForm from '../components/FamiliesForm';
import AddressForm from '../components/AddressForm';
import HeaderForm from '../components/HeaderForm';
import RegistrationProgress from '../components/RegistrationProgress';

import { Container } from './styles';

export default function NewFamilies() {
  const [renderForm, setRenderForm] = useState(1);
  const [idResp, setIdResp] = useState(0);

  const updateRender = () => {
    setRenderForm(2);
  };

  return (
    <Container>
      <HeaderForm title="Cadastro de família" to="/adm/familias" />

      <RegistrationProgress check={renderForm} />

      {renderForm === 1
        ? (
          <FamiliesForm
            buttonLabel="Cadastrar responável"
            func={updateRender}
            setIdResp={setIdResp}
          />
        )
        : (
          <AddressForm
            buttonLabel="Cadastrar endereço"
            idResp={idResp}
          />
        )}
    </Container>
  );
}
