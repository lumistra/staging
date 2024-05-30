import { useState } from 'react';
import classNames from 'classnames';
import { map } from 'lodash';
import Arrow from '@/assets/svg/arrow-corner.svg';
import Plus from '@/assets/svg/plus.svg';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/workflow.module.scss';
import { getOrderNumber } from '@/utils';
import Section from './Section';

function Workflow() {
  const { t } = useTranslations();
  const [expanded, setExpanded] = useState(0);

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
        <Arrow className={style.icon} />
        <div className={style.column}>
          <span className={style.title}>{t('workflow.title')}</span>
          <p>{t('workflow.paragraph')}</p>
        </div>
      </div>
      {map(steps, (step, index) => {
        const isExpanded = expanded === index;

        return (
          <div
            key={step}
            className={style.row}
            onClick={() => handleToggleExpand(index)}
          >
            <span className={style.index}>{getOrderNumber(index)}</span>
            <div className={style.column}>
              <div className={style.heading}>
                <span>{t(`workflow.steps.${step}.label`)}</span>
                <Plus className={classNames(style.icon, {
                  [style.expanded]: isExpanded,
                })}
                />
              </div>
              {isExpanded && (
                <p>{t(`workflow.steps.${step}.paragraph`)}</p>
              )}
            </div>
          </div>
        );
      },
      )}
    </Section>
  );
}

export default Workflow;
