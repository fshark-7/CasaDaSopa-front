import { Container } from './styles';

import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import Galery from '../components/Galery';
import HelpAreas from '../components/HelpAreas';

export default function Home() {
  return (
    <Container>
      <Banner />
      <AboutUs />
      <HelpAreas />
      <Galery />
      <ContactUs />
    </Container>
  );
}
