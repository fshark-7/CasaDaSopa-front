import TitleSection from '../TitleSection';
import ContainerSection from '../ContainerSection';
import FormGrouping from '../../../../components/FormGrouping';
import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';

import {
  Form, Box, ButtonContainer,
} from './styles';

export default function ContactUs() {
  return (
    <ContainerSection>
      <TitleSection
        title="Deseja ser um colaborador ou receber mais informações? Nos envie um email que entraremos em contato!"
      />
      <Form>
        <Box>
          <FormGrouping>
            <Input
              placeholder="Informe seu nome"
            />
          </FormGrouping>

          <FormGrouping>
            <Input
              placeholder="Informe seu email"
            />
          </FormGrouping>
        </Box>
        <FormGrouping>
          <TextArea
            placeholder="Mensagem: Desejo ser um colavorador da Casa da Sopa"
          />
        </FormGrouping>

        <ButtonContainer>
          <Button type="button">Enviar email</Button>
        </ButtonContainer>
      </Form>

    </ContainerSection>
  );
}
