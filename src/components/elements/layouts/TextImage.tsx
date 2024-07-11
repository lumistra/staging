import { storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Section from '@/components/containers/Section';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import Lightbox from '../Lightbox';
import RichText from '../RichText';
import type { ImageData } from '@/types/shared';
import type { ISbRichtext, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & {
    align: 'left' | 'right'
    text?: ISbRichtext
    image: ImageData
  }
};

export default function TextImage(props: Props) {
  return (
    <Section containerClassName={style.textWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <RichText className={classNames({
        [style.alignLeft]: props.blok.align === 'left',
        [style.alignRight]: props.blok.align === 'right',
      })}
      >
        {props.blok.text}
      </RichText>
      <Lightbox image={props.blok.image}>
        <Image
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
