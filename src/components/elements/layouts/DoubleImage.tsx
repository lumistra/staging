import { map } from 'lodash';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { Image as ImageType } from '@/types/shared';

type Props = {
  images: [ImageType, ImageType]
};

export default function DoubleImage(props: Props) {
  return (
    <div className={style.doubleImageWrapper}>
      {map(props.images, (image, index) => (
        <Image
          key={index}
          className={style.doubleImage}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
