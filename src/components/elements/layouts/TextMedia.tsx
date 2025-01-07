import { storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import style from '@/styles/layouts.module.scss';
import RichText from '../RichText';
import type { MediaData } from '@/types/shared';
import type { ISbRichtext, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & {
    align: 'left' | 'right'
    text?: ISbRichtext
    image: MediaData
  }
};

export default function TextMedia(props: Props) {
  return (
    <Section
      containerClassName={style.textWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <RichText className={classNames({
        [style.alignLeft]: props.blok.align === 'left',
        [style.alignRight]: props.blok.align === 'right',
      })}
      >
        {props.blok.text}
      </RichText>
      <Lightbox image={props.blok.image}>
        <Media
          className={classNames(style.imageColumn, {
            [style.alignRight]: props.blok.align === 'left',
            [style.alignLeft]: props.blok.align === 'right',
          })}
          src={props.blok.image.filename}
          alt={props.blok.image.alt}
        />
      </Lightbox>
    </Section>
  );
}
