import EntitiesForm from '../components/EntitiesForm ';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewContributors() {
  return (
    <Container>
      <HeaderForm title="Criação de entidades" to="/adm/entidades" />
      <EntitiesForm
        buttonLabel="Cadastrar entidade"
      />
    </Container>
  );
}
