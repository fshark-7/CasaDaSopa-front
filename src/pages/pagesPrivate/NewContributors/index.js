import ContributorsForm from '../components/ContributorsForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewContributors() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/colaboradores" />
      <ContributorsForm
        buttonLabel="Cadastrar colaborador"
      />
    </Container>
  );
}
