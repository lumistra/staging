import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import style from '@/styles/layouts.module.scss';
import type { MediaData } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    firstImage: MediaData
    secondImage: MediaData
    thirdImage: MediaData
  }
};

export default function TripleMedia(props: Props) {
  const images = [props.blok.firstImage, props.blok.secondImage, props.blok.thirdImage];

  return (
    <Section
      containerClassName={style.tripleImageWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {map(images, (image, index) => (
        <Lightbox key={index} image={image}>
          <Media
            className={style.tripleImage}
            src={image.filename}
            alt={image.alt}
          />
        </Lightbox>
      ))}
    </Section>
  );
}
