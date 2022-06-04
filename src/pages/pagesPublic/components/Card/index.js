import {
  CardContainer, Content, Icon, Title,
} from './styles';

// import icoAlimentacao from '../../../../assets/images/alimentacao.svg';

export default function Card({ title, ico }) {
  return (
    <CardContainer>
      <Content>
        <Icon>
          <img src={ico} alt="" />
        </Icon>
        <Title>{title}</Title>
      </Content>
    </CardContainer>

  );
}
