import classNames from 'classnames';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/news.module.scss';
import { parseMarkdown } from '@/utils';
import Section from '../Section';

type Props = {
  className?: string
  altBackground?: boolean
};

export default function WantToPublish(props: Props) {
  const { t } = useTranslations();

  return (
    <Section
      className={classNames(props.className, {
        [style.backgroundBlack]: !props.altBackground,
        [style.backgroundGray]: props.altBackground,
      })}
      containerClassName={style.wantToPublishWrapper}
    >
      <h3>{t('news.cta.title')}</h3>
      <p>{parseMarkdown(t('news.cta.paragraph'))}</p>
    </Section>
  );
}
