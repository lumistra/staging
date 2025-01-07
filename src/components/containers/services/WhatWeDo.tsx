import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map, split } from 'lodash';
import Section from '@/components/containers/Section';
import style from '@/styles/services.module.scss';
import type { WhatWeDoData } from '@/types/components';

type Props = {
  blok: SbBlokData & WhatWeDoData
};

export default function WhatWeDo(props: Props) {
  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.servicesWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <span className={style.servicesTitle}>{props.blok.title}</span>
      <span className={style.servicesTitle}>{props.blok.section}</span>
      <p className={style.servicesParagraph}>{props.blok.paragraph}</p>
      <div className={style.servicesGrid}>
        {map(props.blok.services, (group, groupIndex) => (
          <div key={`${group.title}-${groupIndex}`} className={style.servicesColumn}>
            <span className={style.servicesColumnLabel}>{group.title}</span>
            {map(split(group.list, '\n'), (item, itemIndex) => (
              <span key={`${item}-${itemIndex}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
