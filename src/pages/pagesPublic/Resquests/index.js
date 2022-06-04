import { useEffect, useState } from 'react';
import {
  Container, Header, Content, Card, Title, Description, FooterCard,
} from './styles';

import Loader from '../../../components/Loader';
import FamilyRequestService from '../../../services/FamilyRequestService';
import ErrorContainer from '../../pagesPrivate/components/ErrorContainer';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const { data } = await FamilyRequestService.listRequests();
      setHasError(false);
      setRequests(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleTryAgain = () => {
    loadRequests();
  };

  return (
    <Container>
      { isLoading && <Loader />}

      <Header>
        <h2>Se você sente que precisa ajudar, escolha uma das solicitações e ajude uma família.</h2>
      </Header>

      {hasError && (
        <ErrorContainer
          msgErro="Ocorreu um erro ao obter a lista solicitações da família"
          click={handleTryAgain}
        />
      )}

      <Content>
        {
            requests.map((request) => (
              <Card key={request.id}>
                <Title>
                  <strong>{request.titulo}</strong>
                </Title>
                <Description>
                  <p>
                    {request.descricao}
                  </p>
                </Description>
                <FooterCard>
                  <small>Pedir contato</small>
                </FooterCard>
              </Card>
            ))
        }
      </Content>
    </Container>
  );
}
