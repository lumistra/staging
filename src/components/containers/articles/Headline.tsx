import { useEffect, useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { format } from 'date-fns';
import round from 'lodash/round';
import Image from '@/components/elements/Image';
import Lightbox from '@/components/elements/Lightbox';
import style from '@/styles/article.module.scss';
import Section from '../Section';
import type { HeadlineData } from '@/types/articles';

type Props = {
  blok: SbBlokData & HeadlineData
};

// Average words per minute read time
const WPM = 238;

function Headline(props: Props) {
  const [readTime, setReadTime] = useState('Calculating...');
  const intervalID = useRef<NodeJS.Timeout>();
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
    <Section containerClassName={style.heroWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <h1 className={style.heroTitle}>{props.blok.title}</h1>
      <span className={style.heroCredentials}>
        <span className={style.heroAuthor}>Written by {props.blok.author}</span>
        <span className={style.heroDate}>on {format(publishedAt, 'MMM do yyyy')}</span>
        <span className={style.heroReadTime}>Read time: {readTime}</span>
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
