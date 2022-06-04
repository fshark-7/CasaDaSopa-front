import ReactDOM from 'react-dom';
import {
  Overlay, Container, Content, Footer,
} from './styles';

import Button from '../Button';

export default function Modal({
  danger, children, titleBtn, titleModal, close,
}) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{titleModal}</h1>
        <Content>
          {children}
        </Content>
        <Footer>
          <button
            type="button"
            className="cancel"
            onClick={close}
          >
            Cancelar
          </button>
          <Button danger={danger} type="button">
            {titleBtn}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}
