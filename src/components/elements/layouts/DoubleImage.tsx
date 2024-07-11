import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import Lightbox from '../Lightbox';
import type { ImageData } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    firstImage: ImageData
    secondImage: ImageData
  }
};

export default function DoubleImage(props: Props) {
  const images = [props.blok.firstImage, props.blok.secondImage];

  return (
    <Section containerClassName={style.doubleImageWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      {map(images, (image, index) => (
        <Lightbox key={index} image={image}>
          <Image
            className={style.doubleImage}
            src={image.filename}
            alt={image.alt}
          />
        </Lightbox>
      ))}
    </Section>
  );
}
