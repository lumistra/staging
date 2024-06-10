import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { CMSImage } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    firstImage: CMSImage
    secondImage: CMSImage
    thirdImage: CMSImage
  }
};

export default function TripleImage(props: Props) {
  const images = [props.blok.firstImage, props.blok.secondImage, props.blok.thirdImage];

  return (
    <div className={style.tripleImageWrapper} {...storyblokEditable(props.blok)}>
      {map(images, (image, index) => (
        <Image
          key={index}
          className={style.tripleImage}
          src={image.filename}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
