import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';

export default function PaginationComponent({ pages, currentPage, setCurrentPage }) {
  const backPage = () => {
    setCurrentPage((prevState) => (prevState > 0 ? prevState - 1 : 0));
  };

  const nextPage = () => {
    setCurrentPage((prevState) => (prevState < pages ? prevState + 1 : pages));
  };

  return (
    <Container>
      <h1>{currentPage + 1 }</h1>
      <MdKeyboardArrowLeft onClick={backPage} />

      <MdKeyboardArrowRight onClick={nextPage} />
      <h1>{pages}</h1>
    </Container>
  );
}
