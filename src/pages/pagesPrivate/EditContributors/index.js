import { useParams } from 'react-router-dom';
import ContributorsForm from '../components/ContributorsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function EditContributors() {
  const { id } = useParams();
  return (
    <Container>
      <HeaderForm title="Edição de colaboradores" to="/adm/colaboradores" />
      <ContributorsForm
        id={id || null}
        buttonLabel="Salvar alterações"
      />
    </Container>
  );
}
