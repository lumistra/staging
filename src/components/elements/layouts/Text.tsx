import { storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Section from '@/components/containers/Section';
import style from '@/styles/layouts.module.scss';
import RichText from '../RichText';
import type { ISbRichtext, SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & {
    align: 'left' | 'right'
    text: ISbRichtext
  }
};

export default function Text(props: Props) {
  return (
    <Section containerClassName={style.textWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <RichText className={classNames({
        [style.alignLeft]: props.blok.align === 'left',
        [style.alignRight]: props.blok.align === 'right',
      })}
      >
        {props.blok.text}
      </RichText>
    </Section>
  );
}
