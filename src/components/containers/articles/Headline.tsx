import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { format } from 'date-fns';
import Image from '@/components/elements/Image';
import Lightbox from '@/components/elements/Lightbox';
import style from '@/styles/article.module.scss';
import Section from '../Section';
import type { HeadlineData } from '@/types/articles';

type Props = {
  blok: SbBlokData & HeadlineData
};

function Headline(props: Props) {
  const publishedAt = new Date(props.blok.publishedAt);

  return (
    <Section containerClassName={style.heroWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <h1 className={style.heroTitle}>{props.blok.title}</h1>
      <span className={style.heroDate}>
        Written by {props.blok.author} on {format(publishedAt, 'MMM io yyyy')}
      </span>
      <Lightbox image={props.blok.cover}>
        <Image
          className={style.heroCover}
          src={props.blok.cover.filename}
          alt={props.blok.cover.alt}
        />
      </Lightbox>
    </Section>
  );
}

export default Headline;
