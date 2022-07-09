import { Link } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { FaFilePdf } from 'react-icons/fa';

import { Container } from './styles';
import Button from '../../../../components/Button';

export default function HeaderContent({
  hasError, filteredArray, textSing,
  textPlu, textButtom, to, print,
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
      {
        print && (
        <Button onClick={() => print()}>
          <FaFilePdf size={24} />
          Relatório
        </Button>
        )
      }

      <Link to={to}>
        <span>{textButtom}</span>
        <MdPersonAddAlt1 className="ico" />
      </Link>
    </Container>
  );
}
