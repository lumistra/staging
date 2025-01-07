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
  }
};

export default function DoubleMedia(props: Props) {
  const mediaFiles = [props.blok.firstImage, props.blok.secondImage];

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.doubleImageWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      {map(mediaFiles, (media, index) => (
        <Lightbox key={index} image={media}>
          <Media
            className={style.doubleImage}
            src={media.filename}
            alt={media.alt}
          />
        </Lightbox>
      ))}
    </Section>
  );
}
