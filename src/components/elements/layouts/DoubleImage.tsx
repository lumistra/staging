import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import Lightbox from '../Lightbox';
import type { CMSImage } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    firstImage: CMSImage
    secondImage: CMSImage
  }
};

export default function DoubleImage(props: Props) {
  const images = [props.blok.firstImage, props.blok.secondImage];

  return (
    <div className={style.doubleImageWrapper} {...storyblokEditable(props.blok)}>
      {map(images, (image, index) => (
        <Lightbox key={index} image={image}>
          <Image
            className={style.doubleImage}
            src={image.filename}
            alt={image.alt}
          />
        </Lightbox>
      ))}
    </div>
  );
}
