import TitleSection from '../TitleSection';
import ContainerSection from '../ContainerSection';
import Card from '../Card';
import {
  Content,
} from './styles';

import icoAlimentacao from '../../../../assets/images/alimentacao.svg';
import icoMedicamentos from '../../../../assets/images/medicamentos.svg';
import icoAssistencia from '../../../../assets/images/assistencia.svg';

const items = [
  { title: 'Alimentação', ico: icoAlimentacao },
  { title: 'Medicamentos', ico: icoMedicamentos },
  { title: 'Assistência', ico: icoAssistencia },
];

export default function HelpAreas() {
  return (
    <ContainerSection>
      <TitleSection title="Nossa luta é mais do que servir uma refeição, é ajudar o próximo" />

      <Content>
        {
              items.map((item) => (
                <Card key={item.title} title={item.title} ico={item.ico} />
              ))
          }

      </Content>

    </ContainerSection>
  );
}
