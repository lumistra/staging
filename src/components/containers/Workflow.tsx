import { useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Plus from '@/assets/svg/plus.svg';
import Section from '@/components/containers/Section';
import RichText from '@/components/elements/RichText';
import TextMask from '@/components/elements/TextMask';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import style from '@/styles/workflow.module.scss';
import { getOrderNumber } from '@/utils';
import type { WorkflowData } from '@/types/components';

type Props = {
  blok: SbBlokData & WorkflowData
};

function Workflow(props: Props) {
  const [expanded, setExpanded] = useState(-1);

  useScrollAnimations({
    workflowRows: {
      query: '.workflow-animation-container',
      offset: 200,
    },
  });

  const handleToggleExpand = (index: number) => {
    setExpanded((preIndex) => (preIndex === index ? -1 : index));
  };

  return (
    <Section
      id="workflow"
      componentId={props.blok.component}
      className={style.backgroundWrapper}
      containerClassName={style.wrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={style.header}>
        <span className={style.title}>{props.blok.title}</span>
        <RichText className={style.paragraph}>{props.blok.paragraph}</RichText>
      </div>
      <div className="animation-base workflow-animation-container">
        {map(props.blok.steps, (step, index) => {
          const isExpanded = expanded === index;

          return (
            <div
              key={`${step.title}-${index}`}
              className={classNames('workflow-animation-row', style.row)}
              onClick={() => handleToggleExpand(index)}
            >
              <TextMask animationClass="workflow-index-mask">
                <span className={style.index}>{getOrderNumber(index)}</span>
              </TextMask>
              <div className={style.column}>
                <div className={style.heading}>
                  <TextMask animationClass="workflow-label-mask">
                    <span>{step.title}</span>
                  </TextMask>
                  <Plus className={classNames('workflow-animation-icon', style.icon, {
                    [style.expanded]: isExpanded,
                  })}
                  />
                </div>
                <p className={classNames(style.columnParagraph, {
                  [style.columnParagraphExpanded]: isExpanded,
                })}
                >
                  {step.paragraph}
                </p>
              </div>
            </div>
          );
        },
        )}
      </div>
    </Section>
  );
}

export default Workflow;
