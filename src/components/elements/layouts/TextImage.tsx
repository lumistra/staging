import { storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import RichText from '../RichText';
import type { CMSImage } from '@/types/shared';
import type { ISbRichtext, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & {
    align: 'left' | 'right'
    text: ISbRichtext
    image: CMSImage
  }
};

export default function TextImage(props: Props) {
  return (
    <div className={style.textWrapper} {...storyblokEditable(props.blok)}>
      <RichText className={classNames({
        [style.alignLeft]: props.blok.align === 'left',
        [style.alignRight]: props.blok.align === 'right',
      })}
      >
        {props.blok.text}
      </RichText>
      <Image
        className={classNames(style.imageColumn, {
          [style.alignRight]: props.blok.align === 'left',
          [style.alignLeft]: props.blok.align === 'right',
        })}
        src={props.blok.image.filename}
        alt={props.blok.image.alt}
      />
    </div>
  );
}
