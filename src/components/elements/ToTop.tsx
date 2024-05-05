import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import useTranslations from '@/hooks/useTranslations';

type Props = {
  className?: string,
};

export default function ToTop(props: Props) {
  const { t } = useTranslations();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={classNames('to-top', props.className)} onClick={handleClick}>
      {t('globals.back_to_top')}
      <Arrow />
    </button>
  );
}
