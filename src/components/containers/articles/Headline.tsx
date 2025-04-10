import { useEffect, useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { format } from 'date-fns';
import round from 'lodash/round';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import style from '@/styles/articles/article.module.scss';
import type { HeadlineData } from '@/types/articles';

type Props = {
  blok: SbBlokData & HeadlineData
};

// Average words per minute read time
const WPM = 238;

function Headline(props: Props) {
  const [readTime, setReadTime] = useState('Calculating...');
  const intervalID = useRef<NodeJS.Timeout>(undefined);
  const publishedAt = new Date(props.blok.publishedAt);

  useEffect(() => {
    const calculateReadTime = () => {
      const articleText = document.getElementById('article-content')?.textContent;
      if (!articleText) return;

      const matches = articleText.match(/[\w\d’'-]+/gi);
      let wordCount = matches ? matches.length : 0;
      wordCount = wordCount < WPM ? WPM : wordCount;
      setReadTime(round(wordCount / WPM) + 'min');

      clearInterval(intervalID.current);
    };

    calculateReadTime();
    intervalID.current = setInterval(() => calculateReadTime(), 500);

    return () => clearInterval(intervalID.current);
  }, []);

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.heroWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <h1 className={style.heroTitle}>{props.blok.title}</h1>
      <span className={style.heroCredentials}>
        <span className={style.heroAuthor}>Written by {props.blok.author}</span>
        <span className={style.heroDate}>on {format(publishedAt, 'MMM do yyyy')}</span>
        <span className={style.heroReadTime}>Read time: {readTime}</span>
      </span>
      <Lightbox image={props.blok.cover}>
        <Media
          className={style.heroCover}
          src={props.blok.cover.filename}
          alt={props.blok.cover.alt}
        />
      </Lightbox>
    </Section>
  );
}

export default Headline;
