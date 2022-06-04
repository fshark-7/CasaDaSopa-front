import TitleSection from '../TitleSection';
import ContainerSection from '../ContainerSection';
import {
  Content, Text, Photo,
} from './styles';

import imageAbout from '../../../../assets/images/aboutImage.jpeg';

export default function AboutUs() {
  return (
    <ContainerSection bg>
      <TitleSection
        title="Conheça um pouco mais sobre a história da nossa instituição"
      />
      <Content>
        <Text>
          <p>
            O centro Espírita Irmã Veneranda localizado na Rua Floriano Peixoto nº 938, Jardim
            Alvorada em Andradina, atende pessoas carentes da comunidade, servindo refeições todas
            as terças e quintas-feiras no período da tarde e no domingo pela manhã. A Casa da
            Sopa fica na Rua Silvio Shimizu nº 1655, Vila Botega (Lar Esperança).
          </p>
          <p>
            Os interessados em efetuar doações, podem colaborar com os seguintes itens: arroz,
            feijão, macarrão, óle, tempero, leite de caixinha e chocolate em pó. o Centro Espírita
            Irmã Veneranda lembra que o importante não é o que ou a quantidade que se dá, mas o amor
            com que se dá. Sua ajuda é muito importante, participem.
          </p>

        </Text>
        <Photo>
          <img src={imageAbout} alt="" />
        </Photo>
      </Content>
    </ContainerSection>
  );
}
