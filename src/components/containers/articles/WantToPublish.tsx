import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Section from '@/components/containers/Section';
import RichText from '@/components/elements/RichText';
import style from '@/styles/articles/news.module.scss';
import type { WantToPublishData } from '@/types/components';

type Props = {
  blok: SbBlokData & WantToPublishData
};

export default function WantToPublish(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      className={classNames({
        [style.backgroundBlack]: props.blok.background === 'dark',
        [style.backgroundGray]: props.blok.background === 'gray',
        [style.spacingTop]: props.blok.spacingTop,
      })}
      containerClassName={style.wantToPublishWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h3>{props.blok.title}</h3>
      <RichText className={style.wtpParagraph}>
        {props.blok.paragraph}
      </RichText>
    </Section>
  );
}
