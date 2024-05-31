import { map } from 'lodash';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { Image as ImageType } from '@/types/shared';

type Props = {
  images: [ImageType, ImageType, ImageType]
};

export default function TripleImage(props: Props) {
  return (
    <div className={style.tripleImageWrapper}>
      {map(props.images, (image, index) => (
        <Image
          key={index}
          className={style.tripleImage}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
