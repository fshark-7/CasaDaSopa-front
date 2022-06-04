import { Link } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { Container } from './styles';

export default function HeaderContent({
  hasError, filteredArray, textSing, textPlu, textButtom, to,
}) {
  return (
    <Container hasError={hasError}>
      {!hasError && (
      <strong>
        {filteredArray.length}
        {' '}
        {filteredArray.length === 1 ? textSing : textPlu}
      </strong>
      )}
      <Link to={to}>
        <span>{textButtom}</span>
        <MdPersonAddAlt1 className="ico" />
      </Link>
    </Container>
  );
}
