import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import style from '@/styles/layouts.module.scss';
import type { MediaData } from '@/types/shared';

type Props = {
  blok: SbBlokData & {
    image: MediaData
  }
};

export default function SingleMedia(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <Lightbox image={props.blok.image}>
        <Media
          className={style.singleImage}
          src={props.blok.image.filename}
          alt={props.blok.image.alt}
        />
      </Lightbox>
    </Section>
  );
}
