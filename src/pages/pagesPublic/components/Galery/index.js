import TitleSection from '../TitleSection';
import ContainerSection from '../ContainerSection';
import {
  GaleryContainer, Photo, PhotoArea, MostGalery,
} from './styles';

import image1 from '../../../../assets/images/image1.jpeg';
import image2 from '../../../../assets/images/image2.jpeg';
import image3 from '../../../../assets/images/image3.jpeg';
import image4 from '../../../../assets/images/image4.jpeg';

const photos = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image1 },
  { id: 6, image: image2 },
  { id: 7, image: image3 },
  { id: 8, image: image4 },
  { id: 9, image: image1 },
  { id: 10, image: image2 },
  { id: 11, image: image3 },
  { id: 12, image: image4 },
];

export default function Galery() {
  return (
    <ContainerSection bg>
      <TitleSection title="Galeria" />

      <GaleryContainer>
        {
            photos.map((photo) => (
              <Photo key={photo.id}>
                <PhotoArea>
                  <img src={photo.image} alt="" />
                </PhotoArea>
              </Photo>
            ))
        }

      </GaleryContainer>
      <MostGalery>
        Ver mais..
      </MostGalery>
    </ContainerSection>
  );
}
