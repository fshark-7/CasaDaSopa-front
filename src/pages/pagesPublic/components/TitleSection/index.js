import {
  Container,
} from './styles';

export default function TitleSection({ title }) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
}
