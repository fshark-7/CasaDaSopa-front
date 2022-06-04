import { useEffect, useState } from 'react';

import DependentsForm from '../components/DependentsForm';
import HeaderForm from '../components/HeaderForm';

import { Container } from './styles';

export default function NewDependent() {
  const [idFamily] = useState(localStorage.getItem('idFamily'));

  useEffect(() => () => {
    localStorage.removeItem('idFamily');
  });
  return (
    <Container>
      <HeaderForm title="Cadastro de dependente" to={`/adm/familia/edit/${idFamily}`} />

      <DependentsForm
        buttonLabel="Cadastrar depentende"
        idFamily={idFamily}
      />

    </Container>
  );
}
