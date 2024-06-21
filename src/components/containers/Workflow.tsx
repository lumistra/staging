import { useState } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import Plus from '@/assets/svg/plus.svg';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/workflow.module.scss';
import { getOrderNumber } from '@/utils';
import Section from './Section';
import TextMask from '../elements/TextMask';

function Workflow() {
  const { t } = useTranslations();
  const [expanded, setExpanded] = useState(0);

  useScrollAnimations({
    workflowRows: {
      query: '.workflow-animation-container',
      offset: 200,
    },
  });

  const handleToggleExpand = (index: number) => {
    setExpanded(index);
  };

  const steps = [
    'discovery',
    'strategy_development',
    'magic_phase',
    'check_in',
    'review',
    'ta_daa_moment',
    'partnership_support',
  ];

  return (
    <Section
      id="workflow"
      className={style.backgroundWrapper}
      containerClassName={style.wrapper}
    >
      <div className={style.header}>
        <span className={style.title}>{t('workflow.title')}</span>
        <p className={style.paragraph}>{t('workflow.paragraph')}</p>
      </div>
      <div className="workflow-animation-container">
        {map(steps, (step, index) => {
          const isExpanded = expanded === index;

          return (
            <div
              key={step}
              className={style.row}
              onClick={() => handleToggleExpand(index)}
            >
              <TextMask identifier="workflow-index-mask">
                <span className={style.index}>{getOrderNumber(index)}</span>
              </TextMask>
              <div className={style.column}>
                <div className={style.heading}>
                  <TextMask identifier="workflow-label-mask">
                    <span>{t(`workflow.steps.${step}.label`)}</span>
                  </TextMask>
                  <Plus className={classNames(style.icon, {
                    [style.expanded]: isExpanded,
                  })}
                  />
                </div>
                <p className={classNames(style.columnParagraph, {
                  [style.columnParagraphExpanded]: isExpanded,
                })}
                >
                  {t(`workflow.steps.${step}.paragraph`)}
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
