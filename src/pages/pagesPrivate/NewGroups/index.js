import GroupForm from '../components/GroupForm';
import HeaderForm from '../components/HeaderForm';
import { Container } from './styles';

export default function NewGroups() {
  return (
    <Container>
      <HeaderForm title="Cadastro" to="/adm/grupos" />
      <GroupForm
        buttonLabel="Cadastrar grupo"
      />

    </Container>
  );
}
