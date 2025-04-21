import { useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { isEmpty, map } from 'lodash';
import Arrow from '@/assets/svg/arrow.svg';
import Plus from '@/assets/svg/plus.svg';
import Section from '@/components/containers/Section';
import RichText from '@/components/elements/RichText';
import TextMask from '@/components/elements/TextMask';
import useNavigation from '@/hooks/useNavigation';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import style from '@/styles/main/workflow.module.scss';
import { getOrderNumber } from '@/utils';
import type { WorkflowData } from '@/types/components';
import type { CMSLink } from '@/types/shared';

type Props = {
  blok: SbBlokData & WorkflowData
};

function Workflow(props: Props) {
  const { navigate } = useNavigation();
  const [expanded, setExpanded] = useState(-1);

  useScrollAnimations({
    workflowRows: {
      query: '.workflow-animation-container',
      offset: 200,
    },
  });

  const handleToggleExpand = (index: number, link?: CMSLink) => {
    if (isEmpty(link?.url)) {
      setExpanded((preIndex) => (preIndex === index ? -1 : index));

      return;
    }

    navigate({ link });
  };

  return (
    <Section
      id="workflow"
      componentId={props.blok.component}
      className={classNames(style.backgroundWrapper, {
        [style.primary]: props.blok.background === 'primary' || isEmpty(props.blok.background),
        [style.white]: props.blok.background === 'white',
      })}
      containerClassName={style.wrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={classNames(style.header, {
        [style.hidden]: isEmpty(props.blok.title) && isEmpty(props.blok.paragraph),
      })}
      >
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
              onClick={() => handleToggleExpand(index, step.link)}
            >
              <TextMask animationClass="workflow-index-mask">
                <span className={style.index}>{getOrderNumber(index)}</span>
              </TextMask>
              <div className={style.column}>
                <div className={style.heading}>
                  <TextMask animationClass="workflow-label-mask">
                    <span>{step.title}</span>
                  </TextMask>
                  {isEmpty(step.link?.url) ? (
                    <Plus className={classNames('workflow-animation-icon', style.icon, {
                      [style.expanded]: isExpanded,
                    })}
                    />
                  ) : (
                    <Arrow className={classNames('workflow-animation-icon', style.icon)} />
                  )}
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
