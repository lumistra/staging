import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { CMSImage } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    image: CMSImage
  }
};

export default function SingleImage(props: Props) {
  return (
    <Image
      className={style.singleImage}
      src={props.blok.image.filename}
      alt={props.blok.image.alt}
      storyblokEditable={storyblokEditable(props.blok)}
    />
  );
}
