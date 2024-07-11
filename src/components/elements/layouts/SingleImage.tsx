import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Section from '@/components/containers/Section';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import Lightbox from '../Lightbox';
import type { ImageData } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    image: ImageData
  }
};

export default function SingleImage(props: Props) {
  return (
    <Section storyblokEditable={storyblokEditable(props.blok)}>
      <Lightbox image={props.blok.image}>
        <Image
          className={style.singleImage}
          src={props.blok.image.filename}
          alt={props.blok.image.alt}
        />
      </Lightbox>
    </Section>
  );
}
