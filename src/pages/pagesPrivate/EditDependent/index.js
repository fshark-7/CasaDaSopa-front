import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DependentsForm from '../components/DependentsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditDependent() {
  const { id } = useParams();
  const [idFamily] = useState(localStorage.getItem('idFamily'));

  useEffect(() => () => {
    localStorage.removeItem('idFamily');
  });

  return (
    <Container>
      <HeaderForm title="Edição de dependente" to={`/adm/familia/edit/${idFamily}`} />
      <DependentsForm
        id={id || null}
        buttonLabel="Salvar alterações"
        idFamily={idFamily}
      />
    </Container>
  );
}
